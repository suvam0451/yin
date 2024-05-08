import SlashCommandsService from "../services/slash-commands.service";
import * as dotenv from "dotenv";
import path from "path"

dotenv.config({path: path.join(__dirname, '../../.env')});

SlashCommandsService.registerForGuild().then((res) => {
  console.log("success", res)
}).catch((e) => {
  console.log("error", e)
});
