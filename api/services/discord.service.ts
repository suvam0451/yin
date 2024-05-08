import axios from "axios";
import {z} from "zod";


export const DiscordApiResponse_Me = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  global_name: z.string(),
  locale: z.string()
});
export type DiscordApiResponse_MeType = z.infer<typeof DiscordApiResponse_Me>


class DiscordService {
  static async getMe(accessToken: string) {
    return (await axios.get<DiscordApiResponse_MeType>("https://discord.com/api/users/@me", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })).data
  }
}

export default DiscordService;