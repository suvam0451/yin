import {VercelRequest, VercelResponse} from "@vercel/node";
import {OpenAiImageSizeEnum, OpenAiQualityEnum, OpenAiService} from "../../src/services/openai.service";

import {z} from "zod";
import UserRepository from "../../src/repos/user.repo";


const UserImagePromptDTOValidator = z.object({
  guildId: z.string(),
  userId: z.string(),
  userDisplayName: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
  prompt: z.string(),
  size: z.nativeEnum(OpenAiImageSizeEnum).optional(),
  model: z.string(),
  quality: z.nativeEnum(OpenAiQualityEnum).optional()
});

type UserImagePromptDTO = z.infer<typeof UserImagePromptDTOValidator>;

async function main(req: VercelRequest, res: VercelResponse) {
  const {success, data, error} = UserImagePromptDTOValidator.safeParse(req.body);
  if (!success) {
    res.statusCode = 400
    res.json({message: "input validation error", error});
    return
  }

  const body: UserImagePromptDTO = req.body

  const user = UserRepository.upsertDiscordUser({
    guildId: body.guildId,
    userId: body.userId,
    userDisplayName: body.userDisplayName,
    username: body.username,
    avatarUrl: body.avatarUrl
  })

  const promptReply = await OpenAiService.generateImage({
    prompt: body.prompt,
    model: body.model,
    size: body.size,
    quality: body.quality
  })

  res.statusCode = 200
  res.json({
    message: "success", data: {
      promptReply
    }
  })
}

export default main;