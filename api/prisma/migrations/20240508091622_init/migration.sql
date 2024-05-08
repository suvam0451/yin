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
CREATE TABLE "user_image_generate_prompt" (
    "uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_generate_prompt_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_image_generate_prompt_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "image_generate_prompt" (
    "uuid" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_generate_prompt_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "image_generate_prompt_openai_setting" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "image_generate_prompt_id" TEXT NOT NULL,

    CONSTRAINT "image_generate_prompt_openai_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_asset" (
    "uuid" TEXT NOT NULL,
    "relativeUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "media_asset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "image_generate_prompt_result" (
    "uuid" TEXT NOT NULL,
    "media_asset_id" TEXT NOT NULL,
    "image_generate_prompt_id" TEXT NOT NULL,

    CONSTRAINT "image_generate_prompt_result_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "discord_user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "discord_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_guild" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
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
    "active" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "image_generate_prompt_openai_setting_image_generate_prompt__key" ON "image_generate_prompt_openai_setting"("image_generate_prompt_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_user_id_key" ON "discord_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_guild_id_key" ON "discord_guild"("id");

-- AddForeignKey
ALTER TABLE "user_image_generate_prompt" ADD CONSTRAINT "user_image_generate_prompt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image_generate_prompt" ADD CONSTRAINT "user_image_generate_prompt_image_generate_prompt_id_fkey" FOREIGN KEY ("image_generate_prompt_id") REFERENCES "image_generate_prompt"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_generate_prompt_openai_setting" ADD CONSTRAINT "image_generate_prompt_openai_setting_image_generate_prompt_fkey" FOREIGN KEY ("image_generate_prompt_id") REFERENCES "image_generate_prompt"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_generate_prompt_result" ADD CONSTRAINT "image_generate_prompt_result_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "media_asset"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_generate_prompt_result" ADD CONSTRAINT "image_generate_prompt_result_image_generate_prompt_id_fkey" FOREIGN KEY ("image_generate_prompt_id") REFERENCES "image_generate_prompt"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discord_user" ADD CONSTRAINT "discord_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_openai_chatbot_persona" ADD CONSTRAINT "user_openai_chatbot_persona_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
