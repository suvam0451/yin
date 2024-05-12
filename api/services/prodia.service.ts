import {configLazy} from './config.service';
import {createProdia} from 'prodia';
import {OpenAiImageGenerationPromptDTO} from './openai.service';

class ProdiaService {
	static async _client() {
		const config = configLazy();
		return createProdia({
			apiKey: config.prodia.apiKey
		});
	}

	static async generateImage(dto: OpenAiImageGenerationPromptDTO) {
		const client = await this._client();
		switch (dto.model) {
			case 'sd-1.5': {
				const job = await client.generate({
					prompt: dto.prompt,
					steps: 25
				});
				const {imageUrl, status} = await client.wait(job);
				return imageUrl;
			}
			case 'sdxl': {
				const job = await client.xlGenerate({
					prompt: dto.prompt,
					steps: 25
				});
				const {imageUrl, status} = await client.wait(job);
				return imageUrl;
			}
		}
	}
}

export default ProdiaService;