import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {z} from "zod";
import UserRepository from "../repos/user.repo";
import {OpenAiService} from "../services/openai.service";
import {badRequest, successWithData} from "./_utils";

const UserChatPromptDTOValidator = z.object({
  guildId: z.string(),
  userId: z.string(),
  userDisplayName: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
  prompt: z.string()
});

type UserChatPromptDTO = z.infer<typeof UserChatPromptDTOValidator>;

export async function main(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (!event.body) return badRequest("missing body");
  const body = JSON.parse(event.body);
  const {success, data, error} = UserChatPromptDTOValidator.safeParse(body);
  if (!success) return badRequest("input validation error", error);

  await UserRepository.upsertDiscordUser({
    guildId: data.guildId,
    userId: data.userId,
    userDisplayName: data.userDisplayName,
    username: data.username,
    avatarUrl: data.avatarUrl
  })

  const promptReply = await OpenAiService.reply(data.prompt)

  return successWithData({
    promptReply
  })
}