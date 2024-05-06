import OpenAI from "openai";
import {configLazy} from "./config.service"

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
}