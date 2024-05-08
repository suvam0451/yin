-- AlterTable
ALTER TABLE "discord_user" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "accessTokenExpiry" BIGINT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "scope" TEXT;
