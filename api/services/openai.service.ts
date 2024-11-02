import OpenAI from 'openai';
import {configLazy} from './config.service';
import {z} from 'zod';


export enum OpenAiImageSizeEnum {
	'1024x1024' = '1024x1024',
	'256x256' = '256x256',
	'512x512' = '512x512',
	'1792x1024' = '1792x1024',
	'1024x1792' = '1024x1792'
}

export enum OpenAiQualityEnum {
	'standard' = 'standard',
	'hd' = 'hd'
}

const OpenAiImageGenerationPromptDTOValidator = z.object({
	prompt: z.string(),
	size: z.nativeEnum(OpenAiImageSizeEnum).optional(),
	model: z.string(),
	quality: z.nativeEnum(OpenAiQualityEnum).optional()
});

export type OpenAiImageGenerationPromptDTO = z.infer<typeof OpenAiImageGenerationPromptDTOValidator>

export class OpenAiService {
	static async _client() {
		const config = configLazy();
		return new OpenAI(
			{
				apiKey: config.openai.apiKey
			});
	}

	static async reply(input: string) {
		try {
			const config = configLazy();
			const client = await this._client();

			const response = await client.chat.completions.create(
				{
					model: 'gpt-4o', messages: [{
						role: 'system',
						content: config.openai.defaultContext
					}, {
						role: 'user',
						content: input
					}]
				}
			);
			for (let i = 0; i < response?.choices.length; i++) {
				console.log(response?.choices[i].message);
			}
			return response?.choices[0].message.content;
		} catch (e) {
			console.log('error', e);
		}
	}

	static async generateImage(dto: OpenAiImageGenerationPromptDTO) {
		try {
			const client = await this._client();

			const resp = await client.images.generate({
				model: dto.model || 'dall-e-2',
				prompt: dto.prompt,
				// @ts-ignore
				size: dto.size || '1024x1024',
				// @ts-ignore
				quality: dto.quality || 'standard',
				n: 1
			});
			console.log(resp.data);
			return resp.data;
		} catch (e) {
			console.log('error', e);
		}
	}
}