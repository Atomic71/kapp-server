import {
  loginSchema,
  signJwt,
  TokenType,
  validateSchema,
} from './../../utils/auth.utils';
import { createRouter } from './context';
import issueValidation from '../functions/issueValidation';
import checkValidation from '../functions/checkValidation';

export const authRouter = createRouter()
  .mutation('startValidation', {
    input: loginSchema,
    async resolve({ input, ctx }) {
      console.log(`hello ${input.phone}`);
      try {
        const { codeId, userId } = await issueValidation(
          input.phone,
          ctx.prisma
        );

        const token = signJwt({ userId, codeId, type: TokenType.VALIDATION });

        console.log(token);

        return {
          ok: true,
          token,
        };
      } catch (error) {
        return {
          error: 'sth went wrong',
        };
      }
    },
  })
  .mutation('validate', {
    input: validateSchema,
    async resolve({ input: { code }, ctx }) {
      console.log(ctx?.user);
      if (ctx.user) {
        const { userId, codeId } = ctx.user;
        const payload = { userId, codeId, code };
        const user = await checkValidation(payload, ctx.prisma);
      }
      return {};
    },
  });
