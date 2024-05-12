-- CreateTable
CREATE TABLE "iage_generate_prompt_prodia_setting" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "upscale" BOOLEAN NOT NULL DEFAULT false,
    "negative_prompt" TEXT,
    "cfg_scale" INTEGER,
    "sampler" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "steps" INTEGER,
    "style_preset" TEXT,
    "image_generate_prompt_id" TEXT NOT NULL,

    CONSTRAINT "iage_generate_prompt_prodia_setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "iage_generate_prompt_prodia_setting_image_generate_prompt_i_key" ON "iage_generate_prompt_prodia_setting"("image_generate_prompt_id");

-- AddForeignKey
ALTER TABLE "iage_generate_prompt_prodia_setting" ADD CONSTRAINT "iage_generate_prompt_prodia_setting_image_generate_prompt__fkey" FOREIGN KEY ("image_generate_prompt_id") REFERENCES "image_generate_prompt"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
