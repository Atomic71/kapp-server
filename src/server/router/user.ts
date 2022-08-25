import { updateSchema } from '../../utils/user.utils';
import { createRouter } from './context';

export const userRouter = createRouter()
  .query('me', {
    async resolve({ ctx }) {
      if (!ctx.user?.userId) {
        return null;
      }

      return await ctx.prisma.user.findFirst({
        where: {
          id: ctx.user.userId,
        },
      });
    },
  })
  .mutation('update', {
    input: updateSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user.userId) {
        return null;
      }

      return await ctx.prisma.user.update({
        where: {
          id: ctx.user.userId,
        },
        data: {
          ...input,
        },
      });
    },
  });
