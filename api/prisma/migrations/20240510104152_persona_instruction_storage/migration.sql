/*
  Warnings:

  - Added the required column `openai_chatbot_persona_id` to the `openai_chatbot_persona_instruction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "openai_chatbot_persona_instruction" ADD COLUMN     "openai_chatbot_persona_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "openai_chatbot_persona_instruction" ADD CONSTRAINT "openai_chatbot_persona_instruction_openai_chatbot_persona__fkey" FOREIGN KEY ("openai_chatbot_persona_id") REFERENCES "openai_chatbot_persona"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
