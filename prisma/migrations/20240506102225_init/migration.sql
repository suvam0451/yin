-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "openai_chatbot_persona" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "openai_chatbot_persona_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_openai_chatbot_persona" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "user_openai_chatbot_persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "openai_chatbot_persona_instruction" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "openai_chatbot_persona_instruction_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "discord_guild" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "discord_user" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "discord_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discord_guild_id_key" ON "discord_guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_user_id_key" ON "discord_user"("id");

-- AddForeignKey
ALTER TABLE "user_openai_chatbot_persona" ADD CONSTRAINT "user_openai_chatbot_persona_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
