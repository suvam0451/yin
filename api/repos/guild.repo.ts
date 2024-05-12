import DBClient from './_client';

class GuildRepository {
	static async get(id: string) {
		const prisma = DBClient.getInstance().prisma;
		return prisma.discordGuild.findFirst({
			where: {
				guildId: id
			}
		})
	}
}

export default GuildRepository;