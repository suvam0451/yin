import {Client, GatewayIntentBits, Message, ChannelType, IntentsBitField, EmbedBuilder} from 'discord.js';
import * as dotenv from "dotenv";
import VercelBackend from "./services/backend.service";

dotenv.config({path: './.env'});

const botClientId = process.env.DISCORD_BOT_CLIENT_ID || ""
const botClientSecret = process.env.DISCORD_BOT_CLIENT_SECRET || ""
const botClientToken = process.env.DISCORD_BOT_CLIENT_TOKEN || ""

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
    if (message.author.bot || message.author.id === botClientId || message.channel.type === ChannelType.DM) return

    // if(message.mentions.routes.first().bot)
    if (message.mentions.users.first()?.id === botClientId) {
      if (!message.content.startsWith(`<@${botClientId}>`)) return
      let mentionRegex = / ?<@(.*?)> ?/g;
      let prompt = message.content.replaceAll(mentionRegex, "").trim()

      let emojiRegex = / ?<:.*?:.*?> ?/g;
      prompt = prompt.replaceAll(emojiRegex, "").trim()
      if (prompt === "") return

      const retval = await VercelBackend.post("/discord/chat-prompt", {
        guildId: message.guildId,
        userId: message.author.id,
        userDisplayName: message.author.displayName,
        username: message.author.username,
        avatarUrl: message.author.avatar,
        prompt: prompt
      });
      console.log(retval);

      if (!retval?.data?.promptReply) return
      await message.reply({
        content: retval?.data?.promptReply
      })
    } else {
      await message.reply({
        content: "I heard yo !!!",
      });
    }
  })

  bot.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const {commandName, guildId, user} = interaction;
      if (commandName === 'ask') {
        await interaction.reply('Pong!');
      } else if (commandName === "help") {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('About Me')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setDescription("I am an emotional support chatbot and utility assistant built by @suvam0451")
            .setAuthor({name: 'Yin', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org'})
            .setDescription(
                `
Hiya, Yin here ^^ 

I am an emotional support bot. I can help you in three simple ways.

1. Ping me in a normal channel and AMA.
2. Start a chat session, select a persona and talk with me :)
3. Provide me prompts to generate an image.

That's all <3

Use this link to create/edit your chat personas.
You can also set my default persona and view/download your images there ^^

https://suvam0451.com
                `)
            .setFooter({text: 'v0.1.0 • built with <3 by @suvam0451', iconURL: 'https://i.imgur.com/AfFp7pu.png'});

        await interaction.reply({embeds: [exampleEmbed]});
      } else if (commandName === "image") {
        const userId = user.id
        const userDisplayName = user.displayName
        const username = user.username
        const avatarUrl = user.avatar

        const prompt = interaction.options.get("prompt")?.value
        const model = interaction.options.get("model")?.value || "dall-e-2"
        const size = interaction.options.get("size")?.value || "256x256"
        const quality = interaction.options.get("quality")?.value || "standard"

        try {
          await interaction.reply('Working on it...');
          const retval = await VercelBackend.post("/discord/image-prompt", {
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
            const exampleEmbed = new EmbedBuilder()
                .setTitle('Your generated image')
                .setImage(retval.data.promptReply[0].url);

            await interaction.editReply({embeds: [exampleEmbed]})
            return
          } else {
            await interaction.editReply("We failed to get a reply")
            return
          }
        } catch (e) {
          console.log(e)
          await interaction.editReply("Request failed")
          return
        }
      }
    }
  })
  await bot.login(botClientToken)
}

main()