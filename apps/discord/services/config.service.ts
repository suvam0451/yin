import * as dotenv from 'dotenv';
import path from 'path';

// required to run the slash command update script
dotenv.config({path: path.join(__dirname, '../../../.env')});

export function configLazy() {
	const botClientId = process.env.DISCORD_BOT_CLIENT_ID || '';
	const botClientSecret = process.env.DISCORD_BOT_CLIENT_SECRET || '';
	const botClientToken = process.env.DISCORD_BOT_CLIENT_TOKEN || '';
	const backendUrl = process.env.BACKEND_ENDPOINT || '';

	return {
		discord: {
			clientId: botClientId,
			clientSecret: botClientSecret,
			clientToken: botClientToken
		},
		yin: {
			backendUrl: backendUrl
		}
	};
}