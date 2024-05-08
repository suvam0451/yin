import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {badRequest, routeNotFound, validateBody} from "./_utils";
import UserService, {DiscordUserAuthDTO, UserGalleryGetDTO} from "../services/user.service";
import JwtService from "../services/jwt.service";
import {z} from "zod";

export async function getGallery(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const resource = event.pathParameters?.resource
  console.log(event.requestContext.httpMethod, (event.requestContext as any)["http"]["method"])
  const httpMethod = (event.requestContext as any)["http"]["method"]

  switch (httpMethod) {
    case "GET": {
      switch (resource) {
        case "gallery": {
          const {
            bodyValid,
            bodyData,
            res
          } = validateBody<z.infer<typeof UserGalleryGetDTO>>(event.body, UserGalleryGetDTO)
          if (!bodyValid || !bodyData) return res

          const auth = JwtService.verifyToken(event.headers["authorization"])
          if (!auth) return badRequest("auth token invalid")

          return UserService.getGallery(auth, bodyData);
        }

        case "me": {
          const auth = JwtService.verifyToken(event.headers["authorization"])
          if (!auth) return badRequest("auth token invalid")

          return UserService.getMe(auth)
        }
        default: {
          return routeNotFound()
        }
      }
    }
    case "POST": {
      switch (resource) {
        case "discord-oauth": {
          if (!event.body) return badRequest("missing body");
          const body = JSON.parse(event.body);
          const {success, data, error} = DiscordUserAuthDTO.safeParse(body);
          if (!success) return badRequest("input validation error", error);

          return UserService.discordOAuth(data)
        }
        default: {
          return routeNotFound()
        }
      }
    }
    default: {
      return routeNotFound()
    }
  }
}