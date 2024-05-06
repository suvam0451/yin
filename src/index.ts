import {REST, Routes, Client, GatewayIntentBits, Message, ChannelType, IntentsBitField} from 'discord.js';
import * as dotenv from "dotenv";

dotenv.config({path: './.env'});

const botClientId = process.env.DISCORD_BOT_CLIENT_ID || ""
const botClientSecret = process.env.DISCORD_BOT_CLIENT_SECRET || ""
const botClientToken = process.env.DISCORD_BOT_CLIENT_TOKEN || ""

console.log("token", botClientId, botClientSecret);

async function main() {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];

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
      IntentsBitField.Flags.MessageContent,
    ]
  });


  bot.on("messageCreate", async (message: Message) => {
    console.log("received msg")
    if (message.author.bot || message.author.id === botClientId || message.channel.type === ChannelType.DM) return

    await message.reply({
      content: "I heard yo !!!",
    });
  })

  await bot.login(botClientToken)
}

main()