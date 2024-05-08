import DBClient from "../repos/_client";
import {successWithData} from "../routes/_utils";
import {z} from "zod";

export const UserGalleryGetDTO = z.object({
  userId: z.string(),
});

class UserService {
  static async getGallery(body: z.infer<typeof UserGalleryGetDTO>) {
    const prisma = DBClient.getInstance().prisma

    const userImagePrompts = await prisma.userImageGeneratePrompt.findMany({
      where: {
        userId: body.userId
      },
      include: {
        imageGeneratePrompt: {
          include: {
            results: {
              include: {
                mediaAsset: true
              }
            }
          }
        },
      },
    });

    return successWithData({userImagePrompts})
  }
}

export default UserService;