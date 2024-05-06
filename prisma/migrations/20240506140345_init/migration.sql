/*
  Warnings:

  - The primary key for the `discord_user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "discord_user" DROP CONSTRAINT "discord_user_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "discord_user_pkey" PRIMARY KEY ("id");
