import DBClient from '../repos/_client';
import {badRequest, successWithData} from '../routes/_utils';
import {z} from 'zod';
import axios from 'axios';
import {configLazy} from '@yin/discord/services/config.service';
import DiscordService from './discord.service';
import UserRepo from '../repos/user.repo';
import JwtService, {TokenType} from './jwt.service';
import OpenaiRepository from '../repos/openai.repo';
import UserRepository from '../repos/user.repo';

export const UserGalleryGetDTO = z.object({
	limit: z.number().optional(),
	offset: z.number().optional()
});

export const DiscordUserAuthDTO = z.object({
	code: z.string()
});

export const OpenaiPersonaCreateDTO = z.object({
	name: z.string(),
	notes: z.string().optional(),
	instructions: z.array(z.string())
});

export const OpenaiPersonaUpdateDTO = z.object({
	uuid: z.string(),
	name: z.string(),
	notes: z.string().optional(),
	instructions: z.array(z.string())
});


export const DiscordOAuthResponseDTO = z.object({
	token_type: z.string(),
	access_token: z.string(),
	expires_in: z.number(),
	refresh_token: z.string(),
	scope: z.string()
});
type DiscordOAuthResponseType = z.infer<typeof DiscordOAuthResponseDTO>


class UserService {
	static async getGallery(
		auth: TokenType,
		body: z.infer<typeof UserGalleryGetDTO>) {
		const prisma = DBClient.getInstance().prisma;

		const userImagePrompts = await prisma.userImageGeneratePrompt.findMany({
			where: {
				userId: auth.sub
			},
			include: {
				imageGeneratePrompt: {
					include: {
						results: {
							include: {
								mediaAsset: true
							}
						}
					}
				}
			}
		});

		return successWithData({userImagePrompts});
	}

	static async getMe(auth: TokenType) {
		const prisma = DBClient.getInstance().prisma;

		const dt = await prisma.user.findFirst({
			where: {
				uuid: auth.sub
			},
			include: {
				discordUsers: true
			}
		});

		return successWithData(dt);
	}

	static async discordOAuth(body: z.infer<typeof DiscordUserAuthDTO>) {
		const config = configLazy();

		const formData = new URLSearchParams({
			client_id: config.discord.clientId,
			client_secret: config.discord.clientSecret,
			grant_type: 'authorization_code',
			code: body.code,
			redirect_uri: 'https://yin.suvam0451.com/auth/discord'
		});

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept-Encoding': 'application/x-www-form-urlencoded'
		};


		try {
			const output = await axios.post<DiscordOAuthResponseType>('https://discord.com/api/oauth2/token',
				formData,
				{
					headers
				}
			);

			if (output.data) {
				const accessToken = output.data.access_token;
				const userData = await DiscordService.getMe(accessToken);

				const user = await UserRepo.upsertDiscordUser({
					username: userData.username,
					userId: userData.id,
					avatarUrl: userData.avatar
				});
				await UserRepo.discordUserStoreTokens({
					discordUserId: userData.id,
					username: userData.username,
					accessToken: accessToken,
					refreshToken: output.data.refresh_token,
					scope: output.data.scope,
					avatar: userData.avatar
				});

				const token = JwtService.generateUserToken({userUuid: user.uuid});
				return successWithData({token});
			}
			return successWithData({data: output.data});
		} catch (e) {
			console.log(e);
			return badRequest('unknown error occurred.');
		}
	}

	static async createOpenaiChatbotPersona(auth: TokenType, body: z.infer<typeof OpenaiPersonaCreateDTO>) {
		const u = await UserRepository.get(auth.sub);
		if (!u) return badRequest('user not found');
		const x = await OpenaiRepository.saveOpenaiPersona(body);
		if (!x) return badRequest('unable to save openai persona');

		const ux = await UserRepository.assignOpenaiPersona(
			u.uuid, x.uuid
		);
		return successWithData(ux);
	}

	static async updateOpenaiChatbotPersona(auth: TokenType,
		body: z.infer<typeof OpenaiPersonaUpdateDTO>) {
		const x = await OpenaiRepository.updateOpenaiPersona(
			body.uuid, body);
		return successWithData({data: x});
	}
}

export default UserService;