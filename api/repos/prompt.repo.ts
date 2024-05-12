import DBClient from './_client';
import UserRepository from './user.repo';
import MediaAssetRepository from './media-asset.repo';
import AwsService from '../services/aws.service';
import {randomUUID} from 'crypto';

class PromptRepository {
	/**
	 * saves a "image_generate_prompt" record
	 * @param prompt
	 */
	static async save(prompt: string) {
		const prisma = DBClient.getInstance().prisma;

		return prisma.imageGeneratePrompt.create({
			data: {
				prompt: prompt
			}
		});
	}

	static async uploadAndSave(promptId: string, assetId: string, url: string) {
		const prisma = DBClient.getInstance().prisma;
		const res = await AwsService.uploadFileFromUrl(url, `${assetId}.jpg`);
		const savedAsset =
			await MediaAssetRepository.save({
				relativeUrl: `${assetId}.jpg`,
				type: 'image/jpeg'
			});

		await prisma.imageGeneratePromptResult.create({
			data: {
				promptId: promptId,
				mediaAssetId: savedAsset.uuid
			}
		});
	}

	/**
	 * Saves a user prompt
	 * @param userId user id
	 * @param prompt text input
	 * @param results list of images generated
	 */
	static async saveUserPrompt({userId, prompt, results}: {
		userId: string,
		prompt: string,
		results: string[]
	}) {
		const prisma = DBClient.getInstance().prisma;
		const _prompt = await this.save(prompt);

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const savedAsset =
				await MediaAssetRepository.save({
					relativeUrl: result,
					type: 'image/type'
				});

			await prisma.imageGeneratePromptResult.create({
				data: {
					promptId: _prompt.uuid,
					mediaAssetId: savedAsset.uuid
				}
			});
		}

		const user = await UserRepository.get(userId);
		if (user == null) return null;
		return UserRepository.addImagePrompt(user.uuid, _prompt.uuid);
	}

	static async saveResults(promptId: string, results: string[]) {
		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const uuid = randomUUID();
			await this.uploadAndSave(promptId, uuid, result);
		}
	}

	static async saveProdiaPrompt(
		{userId, prompt, results, options}: {
			userId: string, prompt: string, results: string[],
			options: {
				size: string,
				model: string,
				quality: string
			}
		}
	) {
		const prisma = DBClient.getInstance().prisma;
		const _prompt = await this.save(prompt);

		await prisma.imageGeneratePromptProdiaSetting.create({
			data: {
				promptId: _prompt.uuid,
				model: options.model || ''
			}
		});

		await this.saveResults(_prompt.uuid, results)
		const user = await UserRepository.get(userId);
		if (user == null) return null;
		return UserRepository.addImagePrompt(user.uuid, _prompt.uuid);
	}

	static async saveOpenaiPrompt({userId, prompt, results, options}: {
		userId: string, prompt: string, results: string[],
		options: {
			size: string,
			model: string,
			quality: string
		}
	}) {
		const prisma = DBClient.getInstance().prisma;
		const _prompt = await this.save(prompt);

		// Attach the OpenAI options submitted
		await prisma.imageGeneratePromptOpenaiSetting.create({
			data: {
				promptId: _prompt.uuid,

				model: options.model || '',
				size: options.size || '',
				quality: options.quality || ''
			}
		});

		await this.saveResults(_prompt.uuid, results)
		const user = await UserRepository.get(userId);
		if (user == null) return null;
		return UserRepository.addImagePrompt(user.uuid, _prompt.uuid);
	}
}

export default PromptRepository;