import {PrismaClient} from "@prisma/client";
import DBClient from "./_client";
import {z} from "zod";

class UserRepository {
  static async get(uuid: string) {
    const prisma = DBClient.getInstance().prisma

    return prisma.user.findFirst({
      where: {
        uuid: uuid
      }
    });
  }

  /**
   * Relates a image prompt to user
   * @param userId
   * @param promptId
   */
  static async addImagePrompt(userId: string, promptId: string) {
    const prisma = DBClient.getInstance().prisma

    return prisma.userImageGeneratePrompt.create({
      data: {
        userId,
        imageGeneratePromptId: promptId
      }
    });
  }

  static async upsertDiscordUser({
                                   guildId,
                                   userId,
                                   userDisplayName,
                                   username, avatarUrl
                                 }: {
    guildId: string,
    userId: string,
    userDisplayName: string,
    username: string,
    avatarUrl: string
  }) {
    const prisma = DBClient.getInstance().prisma
    let existingUser = await prisma.discordUser.findFirst({
      relationLoadStrategy: "join",
      include: {
        user: true
      },
      where: {
        id: userId
      }
    });

    if (existingUser) return existingUser.user;

    return prisma.user.create({
      data: {
        username: username,
        discordUsers: {
          create: [{
            username: username,
            avatar: avatarUrl,
            id: userId
          }]
        }
      },
    });
  }
}

export default UserRepository;