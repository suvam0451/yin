import DBClient from "./_client";
import UserRepository from "./user.repo";
import MediaAssetRepository from "./media-asset.repo";

class PromptRepository {
  static async save(prompt: string) {
    const prisma = DBClient.getInstance().prisma

    return prisma.imageGeneratePrompt.create({
      data: {
        prompt: prompt,
      }
    });
  }

  /**
   * Saves a user prompt
   * @param userId user id
   * @param prompt text input
   * @param results list of images generated
   */
  static async saveUserPrompt({userId, prompt, results}: { userId: string, prompt: string, results: string[] }) {
    const prisma = DBClient.getInstance().prisma
    const _prompt = await this.save(prompt)

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const savedAsset =
          await MediaAssetRepository.save({relativeUrl: result, type: "image/type"})

      await prisma.imageGeneratePromptResult.create({
        data: {
          promptId: _prompt.uuid,
          mediaAssetId: savedAsset.uuid
        }
      })
    }

    const user = await UserRepository.get(userId)
    if (user == null) return null
    return UserRepository.addImagePrompt(user.uuid, _prompt.uuid)
  }

  static async saveOpenaiPrompt({userId, prompt, results, options}: {
    userId: string, prompt: string, results: string[],
    options: {
      size: string,
      model: string,
      quality: string
    }
  }) {
    const prisma = DBClient.getInstance().prisma
    const _prompt = await this.save(prompt)

    // Attach the OpenAI options submitted
    await prisma.imageGeneratePromptOpenaiSetting.create({
      data: {
        promptId: _prompt.uuid,

        model: options.model || "",
        size: options.size || "",
        quality: options.quality || ""
      }
    })

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const savedAsset =
          await MediaAssetRepository.save({relativeUrl: result, type: "image/type"})
      await prisma.imageGeneratePromptResult.create({
        data: {
          promptId: _prompt.uuid,
          mediaAssetId: savedAsset.uuid
        }
      })
    }

    const user = await UserRepository.get(userId)
    if (user == null) return null
    return UserRepository.addImagePrompt(user.uuid, _prompt.uuid)
  }
}

export default PromptRepository;