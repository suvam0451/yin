import {z} from "zod";

export function badRequest(msg: string, error?: object) {
  return {
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