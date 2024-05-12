import DBClient from './_client';

class UserRepository {
	static async get(uuid: string) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.user.findFirst({
			where: {
				uuid: uuid
			}
		});
	}

	static async removeDefaultOpenaiPersona(userId: string) {
		const prisma = DBClient.getInstance().prisma;

		await prisma.userOpenaiChatbotPersona.updateMany({
			where: {
				userId
			},
			data: {
				selected: false
			}
		});
		return;
	}

	static async updateDefaultOpenaiPersona(userId: string, personaId: string) {
		const prisma = DBClient.getInstance().prisma;

		await prisma.userOpenaiChatbotPersona.updateMany({
			where: {
				userId,
				openaiChatbotPersonaId: {
					not: personaId
				}
			},
			data: {
				selected: false
			}
		});

		await prisma.userOpenaiChatbotPersona.updateMany({
			where: {
				userId,
				openaiChatbotPersonaId: personaId
			},
			data: {
				selected: true
			}
		});

		return prisma.userOpenaiChatbotPersona.findFirst({
			where: {
				selected: true
			}
		});
	}

	static async getOpenaiChatbotPersonas(uuid: string) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.userOpenaiChatbotPersona.findMany({
			where: {
				userId: uuid,
				active: true
			},
			select: {
				openaiChatbotPersona: {
					select: {
						instructions: {
							where: {
								active: true
							}
						},
						name: true,
						notes: true,
						uuid: true
					}
				}
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