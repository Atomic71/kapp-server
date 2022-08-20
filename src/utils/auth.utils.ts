import { User, ValidationCode } from '@prisma/client';
import { z } from 'zod';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../env/server.mjs';

export const phoneSchema = z.string().startsWith('+387').length(12);
export const codeSchema = z.string();
export const loginSchema = z.object({
  phone: phoneSchema,
});
export const validateSchema = z.object({
  code: codeSchema,
});
export const createValidationCode = () => {
  const chars = '0123456789';
  let strToReturn = '';
  while (strToReturn.length < 6) {
    strToReturn += chars[Math.floor(Math.random() * chars.length)];
  }
  console.log(`validation code: ${strToReturn}`);
  return strToReturn;
};
export enum TokenType {
  VALIDATION = 'validation',
  STANDARD = 'standard',
}

export type SignPayload = {
  userId: User['id'];
  role?: User['role'];
  validated?: User['validated'];
  type: TokenType;
};

export const signJwt = (payload: SignPayload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  console.log(`token issued: ${token}`);

  return token;
};

export const readJwt = (payload: string) => {
  const token = jwt.verify(payload, env.JWT_SECRET, {});
  console.log(`decoded token: ${token}`);
  return token;
};

export type ILogin = z.infer<typeof loginSchema>;
export type IValidate = z.infer<typeof validateSchema>;
