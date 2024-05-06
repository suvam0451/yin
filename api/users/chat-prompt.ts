import {VercelRequest, VercelResponse} from "@vercel/node";
import {PrismaClient} from "@prisma/client";
import {OpenAiService} from "../../src/services/openai.service";

import {z} from "zod";
import UserRepository from "../../src/repos/user.repo";

const UserChatPromptDTOValidator = z.object({
  guildId: z.string(),
  userId: z.string(),
  userDisplayName: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
  prompt: z.string()
});

type UserChatPromptDTO = z.infer<typeof UserChatPromptDTOValidator>;

async function main(req: VercelRequest, res: VercelResponse) {
  const {success, data} = UserChatPromptDTOValidator.safeParse(req.body);
  if (!success) {
    res.statusCode = 400
    res.json({message: "input validation error"});
    return
  }

  const body: UserChatPromptDTO = req.body

  const user = UserRepository.upsertDiscordUser({
    guildId: body.guildId,
    userId: body.userId,
    userDisplayName: body.userDisplayName,
    username: body.username,
    avatarUrl: body.avatarUrl
  })

  const promptReply = await OpenAiService.reply(body.prompt)

  res.statusCode = 200
  res.json({
    message: "success", data: {
      promptReply
    }
  })
}

export default main;