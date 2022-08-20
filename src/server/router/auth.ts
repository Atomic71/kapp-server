import { createRouter } from './context';
import { loginSchema } from '../../utils/auth.utils';
import { z } from 'zod';
import issueValidation from '../functions/issueValidation';

export const authRouter = createRouter()
  .mutation('startValidation', {
    input: loginSchema,
    async resolve({ input, ctx }) {
      console.log(`hello ${input.phone}`);
      try {
        await issueValidation(input.phone, ctx.prisma);
        return {
          ok: true,
        };
      } catch (error) {
        return {
          error: 'sth went wrong',
        };
      }
    },
  })
  .mutation('validate', {
    input: z.string(),
    resolve({ input }) {
      console.log(input);
      return {};
    },
  });
