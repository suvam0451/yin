import {PrismaClient} from '@prisma/client';
import DBClient from './_client';
import {z} from 'zod';

class UserRepository {
	static async get(uuid: string) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.user.findFirst({
			where: {
				uuid: uuid
			}
		});
	}

	/**
	 * Relates a image prompt to user
	 * @param userId
	 * @param promptId
	 */
	static async addImagePrompt(userId: string, promptId: string) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.userImageGeneratePrompt.create({
			data: {
				userId,
				imageGeneratePromptId: promptId
			}
		});
	}

	/**
	 *
	 * @param userId
	 * @param username
	 * @param avatarUrl
	 *
	 * @returns user entity
	 */
	static async upsertDiscordUser({
		userId,
		username, avatarUrl
	}: {
		guildId?: string,
		userId: string,
		userDisplayName?: string,
		username: string,
		avatarUrl: string
	}) {
		const prisma = DBClient.getInstance().prisma;
		let existingUser = await prisma.discordUser.findFirst({
			relationLoadStrategy: 'join',
			include: {
				user: true
			},
			where: {
				id: userId
			}
		});

		if (existingUser) return existingUser.user;

		return prisma.user.create({
			data: {
				username: username,
				discordUsers: {
					create: [{
						username: username,
						avatar: avatarUrl,
						id: userId
					}]
				}
			}
		});
	}

	static async assignOpenaiPersona(userId: string, personaId: string
	) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.userOpenaiChatbotPersona.create({
			data: {
				userId,
				openaiChatbotPersonaId: personaId
			}
		});
	}

	static async discordUserStoreTokens({
		discordUserId,
		accessToken,
		refreshToken,
		username,
		avatar,
		scope
	}: {
		discordUserId: string,
		accessToken: string,
		refreshToken: string,
		username: string,
		avatar: string,
		scope: string
	}) {
		const prisma = DBClient.getInstance().prisma;
		await prisma.discordUser.update({
			where: {
				id: discordUserId
			},
			data: {
				username,
				accessToken,
				refreshToken,
				avatar,
				scope
			}
		});
	}
}

export default UserRepository;