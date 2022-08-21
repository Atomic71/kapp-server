import { createRouter } from './context';

export const userRouter = createRouter().query('me', {
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
});
