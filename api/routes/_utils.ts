import {z} from "zod";
import {UserGalleryGetDTO} from "../services/user.service";

export function routeNotFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 404,
    body: JSON.stringify(
        {
          message: "route not found"
        },
    ),
  }
}

export function validateBody<T>(body: any, validator: z.ZodObject<any>): {
  bodyValid: boolean,
  bodyData?: T,
  res?: any
} {
  if (!body) return {
    bodyValid: false,
    res: badRequest("missing body")
  };

  const _body = JSON.parse(body);
  const {success, data, error} = validator.safeParse(_body);
  if (!success) return {
    bodyValid: false,
    res: badRequest("input validation error", error)
  }
  return {bodyValid: success, bodyData: data as T}
}

export function badRequest(msg: string, error?: object) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 400,
    body: JSON.stringify(
        {
          message: msg, error: error || msg
        },
        null,
        2
    ),
  }
}

export function successWithData(data: any) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify({
          data,
          message: "success",
          error: null
        }
    )
  }
}

export function bodyZodValidation(body: any, validator: z.ZodObject<any>) {
  if (!body) return badRequest("missing body");
  const _body = JSON.parse(body);
  const {success, data, error} = validator.safeParse(_body);
  if (!success) return badRequest("input validation error", error);
  return {success, data, error}
}