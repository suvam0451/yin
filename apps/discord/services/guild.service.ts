import BackendService from './backend.service';

class GuildService {
	static async isAllowedBotAccess(guildId: string | number | null) {
		if (!guildId) {
			return {
				success: false,
				reason: 'I am not allowed to serve this guild. Plz contact @suvam0451'
			};
		}
		try {
			const dt = await BackendService.get(`/guild/${guildId}`);

			if (!dt.data.isAllowed) {
				return {
					success: false,
					reason: 'I cannot serve this guild. Plz contact my developer for' +
						' access.'
				};
			} else {
				return {
					success: true,
					reason: 'Success'
				};
			}
		} catch (e: any) {
			console.log(e.response?.data?.data);
			return {
				success: false,
				reason: e?.response?.data?.message || 'unknown error occurred'
			};
		}
	}
}

export default GuildService;