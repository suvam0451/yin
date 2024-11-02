import {Client} from 'discord.js';
import {configLazy} from '../services/config.service';

async function readyHandler(bot: Client<boolean>) {
	if (!bot.user) return;

	const config = configLazy();

	bot.user.setPresence({
		status: 'online',
		activities: [
			{
				name: 'Something',
				type: 4,
				state: "Deba-kun's imaginary girlfriend ⸜(｡˃ ᵕ ˂ )⸝♡",
			},
		],
	});

	// try {
	// 	await axios.patch('https://discord.com/api/v9/users/@me',
	// 		{'bio': 'https://yin.suvam.io'},
	// 		{
	// 			headers:
	// 				{'authorization': `Bearer ${config.discord.clientToken}`}
	// 		}
	// 	);
	// } catch (e) {
	// 	console.log('error', e);
	// }
}

export default readyHandler;
