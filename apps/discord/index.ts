import {
	Client,
	GatewayIntentBits,
	IntentsBitField
} from 'discord.js';
import guildCreateHandler from './handlers/guildCreate';
import messageCreateHandler from './handlers/messageCreate';
import interactionCreateHandler from './handlers/interactionCreate';
import readyHandler from './handlers/readyHandler';
import {configLazy} from './services/config.service';



async function main() {
	const config = configLazy()
	const botClientToken = config.discord.clientToken

	const bot = new Client({
		intents: [
			// GatewayIntentBits.Guilds,
			// GatewayIntentBits.GuildMembers,
			// GatewayIntentBits.GuildPresences,
			GatewayIntentBits.MessageContent,
			// GatewayIntentBits.DirectMessages,
			// GatewayIntentBits.GuildMessages,
			IntentsBitField.Flags.Guilds,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.MessageContent
		]
	});

	bot.on("ready", () => {
		readyHandler(bot)
	})
	// bot joins new server
	bot.on('guildCreate', guildCreateHandler);
	// bot reads new message
	bot.on('messageCreate', messageCreateHandler);
	// user uses slash command
	bot.on('interactionCreate', interactionCreateHandler);

	await bot.login(botClientToken);
}

main();