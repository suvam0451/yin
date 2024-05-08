import OpenAI from "openai";
import {configLazy} from "../../apps/discord/services/config.service"
import {z} from "zod";


export enum OpenAiImageSizeEnum {
  "1024x1024" = "1024x1024",
  "256x256" = "256x256",
  "512x512" = "512x512",
  "1792x1024" = "1792x1024",
  "1024x1792" = "1024x1792"
}

export enum OpenAiQualityEnum {
  "standard" = "standard",
  "hd" = "hd"
}

const OpenAiImageGenerationPromptDTOValidator = z.object({
  prompt: z.string(),
  size: z.nativeEnum(OpenAiImageSizeEnum).optional(),
  model: z.string(),
  quality: z.nativeEnum(OpenAiQualityEnum).optional()
})

export type OpenAiImageGenerationPromptDTO = z.infer<typeof OpenAiImageGenerationPromptDTOValidator>

export class OpenAiService {
  static async reply(input: string) {
    const config = configLazy()
    try {
      const client = new OpenAI(
          {
            apiKey: config.openai.apiKey
          })

      const response = await client.chat.completions.create(
          {
            model: "gpt-3.5-turbo", messages: [{
              role: "system",
              content: "You are portraying a young girl character called Kirsi/Yin. You are a kuudere and therefore are unable to show much emotion. You will be asked something by the user, and your task is answer them."
            }, {
              role: "user",
              content: input
            }]
          }
      );
      for (let i = 0; i < response?.choices.length; i++) {
        console.log(response?.choices[i].message)
      }
      return response?.choices[0].message.content
    } catch (e) {
      console.log("error", e);
    }
  }

  static async generateImage(dto: OpenAiImageGenerationPromptDTO) {
    const config = configLazy()
    try {
      const client = new OpenAI(
          {
            apiKey: config.openai.apiKey
          })

      const resp = await client.images.generate({
        model: dto.model || "dall-e-2",
        prompt: dto.prompt,
        // @ts-ignore
        size: dto.size || "1024x1024",
        // @ts-ignore
        quality: dto.quality || "standard",
        n: 1,
      })
      console.log(resp.data);
      return resp.data
    } catch (e) {
      console.log("error", e);
    }
  }
}