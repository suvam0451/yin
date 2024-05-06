/*
  Warnings:

  - You are about to drop the column `userId` on the `user_openai_chatbot_persona` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `discord_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_openai_chatbot_persona` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_openai_chatbot_persona" DROP CONSTRAINT "user_openai_chatbot_persona_userId_fkey";

-- AlterTable
ALTER TABLE "discord_user" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_openai_chatbot_persona" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "discord_user" ADD CONSTRAINT "discord_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_openai_chatbot_persona" ADD CONSTRAINT "user_openai_chatbot_persona_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
