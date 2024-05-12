import DBClient from '../repos/_client';
import {successWithData} from '../routes/_utils';

class PromptService {
	static async getRecentPrompts() {
		const prisma = DBClient.getInstance().prisma;

		const res = await prisma.userImageGeneratePrompt.findMany({
			include: {
				imageGeneratePrompt: {
					include: {
						results: {
							include: {
								mediaAsset: true
							}
						},
						openaiSetting: true,
						prodiaSetting: true
					}
				},
				user: {
					include: {
						discordUsers: true
					}
				}
			},
			take: 6,
			orderBy: {
				createdAt: 'desc'
			}
		});

		// NOTE: privacy issues
		return successWithData([]);
	}
}

export default PromptService;