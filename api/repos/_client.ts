import { PrismaClient } from '@prisma/client'

/**
 * Singleton class for the ORM
 */
class DBClient {
  public prisma: PrismaClient
  private static instance: DBClient
  private constructor() {
    this.prisma = new PrismaClient()
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient()
    }
    return DBClient.instance
  }
}

export default DBClient