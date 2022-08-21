import checkValidation from '../functions/checkValidation';
import issueValidation from '../functions/issueValidation';
import logger, { streamNode } from '../logger/logger';
import {
  loginSchema,
  signJwt,
  TokenType,
  validateSchema,
} from './../../utils/auth.utils';
import { createRouter } from './context';

export const authRouter = createRouter()
  .mutation('startValidation', {
    input: loginSchema,
    async resolve({ input, ctx }) {
      streamNode.warn({}, 'yooo');
      logger.warn({}, 'yooo');
      logger.info(
        {
          phone: input.phone,
        },
        `validation starting: `
      );
      try {
        const { userId } = await issueValidation(input.phone, ctx.prisma);

        const token = signJwt({
          userId,
          validated: false,
          type: TokenType.VALIDATION,
        });

        return {
          ok: true,
          token,
        };
      } catch (error: any) {
        logger.error(error, 'something went wrong in auth');
        return {
          error: error?.message ? error.message : '',
        };
      }
    },
  })
  .mutation('validate', {
    input: validateSchema,
    async resolve({ input: { code }, ctx }) {
      console.log(ctx?.user);
      if (ctx.user) {
        const { userId } = ctx.user;
        const payload = { userId, code };
        const user = await checkValidation(payload, ctx.prisma);
        if (user) {
          const { id: userId, validated, role } = user;

          return {
            ok: true,
            token: signJwt({
              type: TokenType.STANDARD,
              validated,
              userId,
              role,
            }),
          };
        }
      }
      return {};
    },
  })
  .mutation('logout', {
    async resolve({ ctx }) {
      const loggedOutUser = await ctx.prisma.user.update({
        where: { id: ctx.user.userId },
        data: {
          validated: false,
        },
      });

      return {
        ok: true,
        token: signJwt({
          validated: false,
          type: TokenType.BASIC,
          userId: loggedOutUser.id,
        }),
      };
    },
  });
