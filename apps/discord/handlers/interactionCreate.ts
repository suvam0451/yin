import {CacheType, EmbedBuilder, Interaction} from 'discord.js';
import VercelBackend from '../services/backend.service';
import GuildService from '../services/guild.service';

async function interactionCreateHandler(body: Interaction<CacheType>) {
	if (body.isChatInputCommand()) {
		const {commandName, guildId, user} = body;
		if (commandName === 'ask') {
			await body.reply('Not implemented yet!');
		} else if (commandName === 'help') {
			const exampleEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('About Me')
				.setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.setDescription('I am a friendly chatbot and ai prompt assistant.')
				.setAuthor({
					name: 'Hiya, Yin here ^^ ',
					iconURL: 'https://i.imgur.com/AfFp7pu.png',
					url: 'https://yin.suvam.io'
				})
				.setDescription(
					`
I am a friendly chatbot and ai prompt assistant.
I can help you in three simple ways:

1. Ping me or reply to me to AMA.
2. Give me prompts to generate an \`/image\`.
3. [WIP] Customize my personality and chat with me :) 

Use this link to customize my personality.
You can also view and download your images there ^^
https://yin.suvam.io/dashboard

That's all <3

p.s. - I am an exclusive-access bot. 
Plz contact dev to enable me for your server ^^`)
				.setFooter({
					text: 'v0.1.0 • built with 💜 by @suvam0451',
					iconURL: 'https://i.imgur.com/AfFp7pu.png'
				});

			await body.reply({embeds: [exampleEmbed], ephemeral: false});
		} else if (commandName === 'image') {
			await body.reply('Working on it...');

			const {
				success,
				reason
			} = await GuildService.isAllowedBotAccess(body.guildId);
			if (!success) {
				return await body.editReply(reason);
			}

			const userId = user.id;
			const userDisplayName = user.displayName;
			const username = user.username;
			const avatarUrl = user.avatar;

			const prompt = body.options.get('prompt')?.value;
			const model = body.options.get('model')?.value || 'dall-e-2';
			const size = body.options.get('size')?.value || '256x256';
			const quality = body.options.get('quality')?.value || 'standard';

			try {

				const retval = await VercelBackend.post('/discord/image-prompt', {
					guildId,
					userId,
					userDisplayName,
					username,
					avatarUrl,
					prompt,
					size,
					model,
					quality
				});
				if (retval) {
					let img = null;
					if (typeof retval.data === 'string') {
						img = retval.data;
					} else {
						img = retval.data.promptReply[0].url;
					}
					const exampleEmbed = new EmbedBuilder()
						.setTitle('Your generated image')
						.setImage(img);

					await body.editReply({embeds: [exampleEmbed]});
					return;
				} else {
					await body.editReply('We failed to get a reply');
					return;
				}
			} catch (e) {
				console.log(e);
				await body.editReply('Request failed');
				return;
			}
		}
	}
}

export default interactionCreateHandler;