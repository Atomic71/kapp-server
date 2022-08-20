import { z } from 'zod';

export const phoneSchema = z.string().startsWith('+387').length(12);
export const loginSchema = z.object({
  phone: phoneSchema,
});

export type ILogin = z.infer<typeof loginSchema>;
