import {
	OpenAiImageSizeEnum,
	OpenAiQualityEnum,
	OpenAiService
} from '../services/openai.service';

import {z} from 'zod';
import UserRepository from '../repos/user.repo';
import PromptRepository from '../repos/prompt.repo';
import {APIGatewayProxyEvent} from 'aws-lambda';
import {badRequest, successWithData} from './_utils';
import ProdiaService from '../services/prodia.service';


const UserImagePromptDTOValidator = z.object({
	guildId: z.string(),
	userId: z.string(),
	userDisplayName: z.string(),
	username: z.string(),
	avatarUrl: z.string(),
	prompt: z.string(),
	size: z.nativeEnum(OpenAiImageSizeEnum).optional(),
	model: z.string(),
	quality: z.nativeEnum(OpenAiQualityEnum).optional()
});

type UserImagePromptDTO = z.infer<typeof UserImagePromptDTOValidator>;

export async function main(event: APIGatewayProxyEvent) {
	if (!event.body) return badRequest('missing body');
	const body = JSON.parse(event.body);
	const {success, data, error} = UserImagePromptDTOValidator.safeParse(body);
	if (!success) return badRequest('input validation error', error);

	const user = await UserRepository.upsertDiscordUser({
		guildId: body.guildId,
		userId: body.userId,
		userDisplayName: body.userDisplayName,
		username: body.username,
		avatarUrl: body.avatarUrl
	});

	if (['sd-1.5', 'sdxl'].includes(body.model)) {
		const promptReply = await ProdiaService.generateImage(
			body
		);
		let results: string[] = [];
		if (promptReply !== undefined && promptReply.length > 0) {
			results = [promptReply || ''];
		}
		await PromptRepository.saveProdiaPrompt({
			userId: user.uuid,
			prompt: body.prompt,
			options: {
				quality: body.quality || 'N/A',
				size: body.size || 'N/A',
				model: body.model
			},
			results
		});

		return successWithData(promptReply);
	} else {
		const promptReply = await OpenAiService.generateImage({
			prompt: body.prompt,
			model: body.model,
			size: body.size,
			quality: body.quality
		});

		let results: string[] = [];
		if (promptReply !== undefined && promptReply.length > 0) {
			results = [promptReply[0].url || ''];
		}

		await PromptRepository.saveOpenaiPrompt({
			userId: user.uuid,
			prompt: body.prompt,
			options: {
				quality: body.quality || 'N/A',
				size: body.size || 'N/A',
				model: body.model
			},
			results
		});

		return successWithData({promptReply});
	}
}