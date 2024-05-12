import PromptService from '../services/prompt.service';
import {badRequest, successWithData} from './_utils';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import GuildRepository from '../repos/guild.repo';

export async function getRecentImagePrompts(event: APIGatewayProxyEvent):
	Promise<APIGatewayProxyResult> {
	return PromptService.getRecentPrompts();
}

export async function getGuildPermissions(event: APIGatewayProxyEvent):
	Promise<APIGatewayProxyResult> {
	const id = event.pathParameters?.id;

	if (!id) {
		return badRequest('validation error');
	}

	const data = await GuildRepository.get(id);
	if (!data) {
		return badRequest('server not registered');
	} else {
		return successWithData(data);
	}
}