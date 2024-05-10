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
						text: instruction
					},
					where: {
						uuid: match.instructions[i].uuid
					}
				});
			}
		}

		return match;
	}
}

export default OpenaiRepository;