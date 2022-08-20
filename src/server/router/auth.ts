import { createRouter } from './context';
import { loginSchema } from '../../utils/auth.utils';

export const authRouter = createRouter().mutation('startValidation', {
  input: loginSchema,
  resolve({ input }) {
    console.log(`hello ${input.phone}`);

    return {
      greeting: `Hello ${input?.phone ?? 'world'}`,
    };
  },
});
