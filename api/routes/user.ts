import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {
	badRequest,
	routeNotFound,
	successWithData,
	validateBody
} from './_utils';
import UserService, {
	DiscordUserAuthDTO,
	OpenaiPersonaCreateDTO, OpenaiPersonaUpdateDTO,
	UserGalleryGetDTO, UuidDto, UuidDtoType
} from '../services/user.service';
import JwtService from '../services/jwt.service';
import {z} from 'zod';
import userService from '../services/user.service';

export async function getGallery(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
	const resource = event.pathParameters?.resource;
	const httpMethod = (event.requestContext as any)['http']['method'];

	switch (httpMethod) {
		case 'GET': {
			switch (resource) {
				case 'gallery': {
					const {
						bodyValid,
						bodyData,
						res
					} = validateBody<z.infer<typeof UserGalleryGetDTO>>(event.body, UserGalleryGetDTO);
					if (!bodyValid || !bodyData) return res;

					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return UserService.getGallery(auth, bodyData);
				}

				case 'me': {
					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return UserService.getMe(auth);
				}
				case 'openai-persona': {
					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return UserService.getOpenaiChatbotPersona(auth);
				}
				default: {
					return routeNotFound();
				}
			}
		}
		case 'POST': {
			switch (resource) {
				case 'discord-oauth': {
					if (!event.body) return badRequest('missing body');
					const body = JSON.parse(event.body);
					const {success, data, error}
						= DiscordUserAuthDTO.safeParse(body);
					if (!success) return badRequest('input validation error', error);

					return UserService.discordOAuth(data);
				}
				case 'openai-persona': {
					const {
						bodyValid,
						bodyData,
						res
					} = validateBody<z.infer<typeof OpenaiPersonaCreateDTO>>(event.body, OpenaiPersonaCreateDTO);
					if (!bodyValid || !bodyData) return res;

					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return UserService.createOpenaiChatbotPersona(auth, bodyData);
				}
				case 'default-openai-persona': {
					const {
						bodyValid,
						bodyData,
						res
					} = validateBody<UuidDtoType>(event.body, UuidDto);
					if (!bodyValid || !bodyData) return res;

					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return userService.updateDefaultOpenaiPersona(auth, bodyData);
				}
				default: {
					return routeNotFound();
				}
			}
		}
		case 'PATCH': {
			switch (resource) {
				case 'openai-persona': {
					const {
						bodyValid,
						bodyData,
						res
					} = validateBody<z.infer<typeof OpenaiPersonaUpdateDTO>>(event.body, OpenaiPersonaUpdateDTO);
					if (!bodyValid || !bodyData) return res;

					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');

					return UserService.updateOpenaiChatbotPersona(auth, bodyData);
				}
				default: {
					return routeNotFound();
				}
			}
		}
		case 'OPTIONS': {
			return successWithData({});
		}
		case 'DELETE': {
			switch (resource) {
				case 'default-openai-persona': {
					const auth = JwtService.verifyToken(event.headers['authorization']);
					if (!auth) return badRequest('auth token invalid');
					return userService.removeDefaultOpenaiPersona(auth);
				}
				default: {
					return routeNotFound();
				}
			}
		}
		default: {
			return routeNotFound();
		}
	}
}