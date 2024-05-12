import {ChannelType, Message} from 'discord.js';
import VercelBackend from '../services/backend.service';
import {configLazy} from '../services/config.service';
import GuildService from '../services/guild.service';

/**
 * Reads and handles a message
 * @param body
 */
async function messageCreateHandler(body: Message) {
	const config = configLazy();
	const botClientId = config.discord.clientId;

	if (body.author.bot || body.author.id === botClientId || body.channel.type === ChannelType.DM) return;

	if (body.mentions.users.first()?.id === botClientId) {
		/**
		 * Not allowed
		 */
		const {
			success,
			reason
		} = await GuildService.isAllowedBotAccess(body.guildId);
		if (!success) {
			return await body.reply(reason);
		}

		if (
			!body.mentions.repliedUser &&
			!body.content.startsWith(`<@${botClientId}>`)) return;
		if (body.mentions.repliedUser && body.mentions.repliedUser.id !== botClientId) return;

		let mentionRegex = / ?<@(.*?)> ?/g;
		let prompt = body.content.replaceAll(mentionRegex, '').trim();

		let emojiRegex = / ?<:.*?:.*?> ?/g;
		prompt = prompt.replaceAll(emojiRegex, '').trim();
		if (prompt === '') return;

		const retval = await VercelBackend.post('/discord/chat-prompt', {
			guildId: body.guildId,
			userId: body.author.id,
			userDisplayName: body.author.displayName,
			username: body.author.username,
			avatarUrl: body.author.avatar,
			prompt: prompt
		});

		if (!retval?.data?.promptReply) return;
		await body.reply({
			content: retval?.data?.promptReply
		});
	} else {
		return;
	}
}

export default messageCreateHandler;