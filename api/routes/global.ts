import UserService from "../services/user.service";
import PromptService from "../services/prompt.service";

export async function getRecentImagePrompts() {
  return PromptService.getRecentPrompts();
}