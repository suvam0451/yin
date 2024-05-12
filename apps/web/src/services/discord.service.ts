class DiscordService {
	static getAvatarUrl(userId: string, avatarId: string) {
		return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png?size=512`;
	}
}

export default DiscordService;