import {Guild} from 'discord.js';

function guildCreateHandler(body: Guild){
	let found = false;
	body.channels.cache.forEach((channel) => {
		// if(found) return;
		// if(channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
		// 	channel.send("Thank you for inviting me!");
		// 	found = true;
		// }
	})
}

export default guildCreateHandler