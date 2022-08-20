import { createRouter } from './context';

export const userRouter = createRouter().query('me', {
  async resolve({ ctx }) {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.user.userId,
      },
    });
  },
});
