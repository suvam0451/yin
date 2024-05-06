import {REST, Routes} from "discord.js";
import {configLazy} from "./config.service"
import slashCommands from "../slashCommands";

class SlashCommandsService {
  static async registerForGuild(guildId?: number) {
    const config = configLazy()
    const res = new REST({version: "10"}).setToken(config.discord.clientToken);

    await res.put(Routes.applicationGuildCommands(config.discord.clientId, "1108115386622283856"), {
      body: slashCommands
    });
  }
}

export default SlashCommandsService;