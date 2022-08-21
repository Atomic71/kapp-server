import checkValidation from '../functions/checkValidation';
import issueValidation from '../functions/issueValidation';
import logger, { APP_STREAM_LOGGER } from '../logger/logger';
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
      logger.info(
        {
          phone: input.phone,
        },
        `validation starting: `
      );
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
    },
  })
  .mutation('validate', {
    input: validateSchema,
    async resolve({ input: { code }, ctx }) {
      if (ctx.user) {
        const { userId } = ctx.user;
        if (userId) {
          const payload = { userId, code };
          const user = await checkValidation(payload, ctx.prisma);
          if (user) {
            const { validated, role } = user;

            APP_STREAM_LOGGER.info(
              {
                userId,
                role,
              },
              'USER_LOGGED_IN'
            );

            return {
              ok: true,
              token: signJwt({
                type: TokenType.STANDARD,
                userId,
                validated,
                role,
              }),
            };
          }
        }
      }
      return {};
    },
  })
  .mutation('logout', {
    async resolve({ ctx }) {
      if (ctx.user.userId) {
        await ctx.prisma.user.update({
          where: { id: ctx.user.userId },
          data: {
            validated: false,
          },
        });
      }
      return {
        ok: true,
        token: signJwt({
          userId: null,
          validated: false,
          type: TokenType.BASIC,
        }),
      };
    },
  });
