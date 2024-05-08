import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {badRequest} from "./_utils";
import UserService, {UserGalleryGetDTO} from "../services/user.service";

export async function getGallery(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (!event.body) return badRequest("missing body");
  const body = JSON.parse(event.body);
  const {success, data, error} = UserGalleryGetDTO.safeParse(body);
  if (!success) return badRequest("input validation error", error);

  return UserService.getGallery(data);
}