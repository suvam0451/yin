import {randomUUID} from 'crypto';
import jwt from 'jsonwebtoken';
import {configLazy} from "./config.service";
import {z} from "zod";

export const TokenValidator = z.object({
  "sub": z.string(),
  "aud": z.string(),// "suvam0451",
  "exp": z.bigint(),
  "iat": z.bigint(),
  "jti": z.string(),
  "scp": z.string().array()
})

export type TokenType = z.infer<typeof TokenValidator>

class JwtService {
  /**
   * Generate JWT for user.
   *
   * Expiry is 1 week
   * @param userUuid
   */
  static generateUserToken({userUuid}: { userUuid: string }) {
    const config = configLazy()

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 60 * 24 * 7);

    const now = new Date();
    const nowTime = now.getTime();

    const signObj = {
      sub: userUuid,
      aud: "suvam0451",
      exp: Math.floor(expiry.getTime() / 1000),
      iat: Math.floor(Date.now() / 1000),
      jti: randomUUID(),
      scp: ['yin:read', 'yin:write'],
    };

    return jwt.sign(signObj, config.app.jwtSecret, {
      algorithm: 'HS256',
    })
  }

  static verifyToken(bearer: string | undefined): TokenType | null {
    if (!bearer) return null
    const config = configLazy()
    const token = bearer.split(' ')[1]
    try {
      return jwt.verify(token, config.app.jwtSecret) as unknown as TokenType
    } catch (e) {
      return null;
    }
  }
}

export default JwtService;