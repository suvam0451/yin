import DBClient from './_client';
import {z} from 'zod';
import {OpenaiPersonaCreateDTO} from '../services/user.service';

class OpenaiRepository {
	static async saveOpenaiPersona({
		name,
		instructions,
		notes
	}: z.infer<typeof OpenaiPersonaCreateDTO>) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.openaiChatbotPersona.create(
			{
				data: {
					name,
					instructions: {
						create: instructions.map((o, i) => ({
							text: o,
							active: true
						}))
					},
					notes,
					active: true
				}
			}
		);
	}

	/**
	 * updates the notes and system instructions for an openai chatbot persona
	 * @param uuid
	 * @param notes
	 * @param instructions
	 */
	static async updateOpenaiPersona(uuid: string,
		{
			name,
			notes,
			instructions
		}: z.infer<typeof OpenaiPersonaCreateDTO>) {
		const prisma = DBClient.getInstance().prisma;

		const match = await prisma.openaiChatbotPersona.findFirst({
			where: {
				uuid
			},
			include: {
				instructions: true
			}
		});

		if (!match) return null;

		if (notes) {
			await prisma.openaiChatbotPersona.update({
				where: {
					uuid: match.uuid
				},
				data: {
					name,
					notes
				}
			});
		}
		for (let i = 0; i < instructions.length; i++) {
			const instruction = instructions[i];

			if (match.instructions.length < i + 1) {
				await prisma.openaiChatbotPersonaInstruction.create({
					data: {
						text: instruction,
						active: true,
						openaiChatbotPersonaId: match.uuid
					}
				});
			} else {
				await prisma.openaiChatbotPersonaInstruction.update({
					data: {
						text: instruction,
						active: true
					},
					where: {
						uuid: match.instructions[i].uuid
					}
				});
			}
		}

		// deactivate trailing instructions
		if (instructions.length < match.instructions.length) {
			for (let i = instructions.length; i < match.instructions.length; i++) {
				await prisma.openaiChatbotPersonaInstruction.update({
					data: {
						active: false
					},
					where: {
						uuid: match.instructions[i].uuid
					}
				});
			}
		}

		// return new result
		return prisma.openaiChatbotPersona.findFirst({
			where: {
				uuid,
				active: true
			},
			include: {
				instructions: {
					where: {
						active: true
					}
				}
			}
		});
	}
}

export default OpenaiRepository;