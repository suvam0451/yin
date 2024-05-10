/*
  Warnings:

  - You are about to drop the column `name` on the `openai_chatbot_persona_instruction` table. All the data in the column will be lost.
  - Added the required column `text` to the `openai_chatbot_persona_instruction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openai_chatbot_persona_id` to the `user_openai_chatbot_persona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "openai_chatbot_persona" ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "openai_chatbot_persona_instruction" DROP COLUMN "name",
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user_openai_chatbot_persona" ADD COLUMN     "openai_chatbot_persona_id" TEXT NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "user_openai_chatbot_persona" ADD CONSTRAINT "user_openai_chatbot_persona_openai_chatbot_persona_id_fkey" FOREIGN KEY ("openai_chatbot_persona_id") REFERENCES "openai_chatbot_persona"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
