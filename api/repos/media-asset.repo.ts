import DBClient from "./_client";

class MediaAssetRepository {
  static async save({relativeUrl, type}: { relativeUrl: string, type: string }) {
    const prisma = DBClient.getInstance().prisma
    return prisma.mediaAsset.create({
      data: {
        relativeUrl,
        type: "image/png"
      }
    })
  }
}

export default MediaAssetRepository;