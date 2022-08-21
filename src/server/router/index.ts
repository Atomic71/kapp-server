import { bloodStorageRouter } from './bloodStorage';
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { userRouter } from './user';
import { ZodError } from 'zod';

export const appRouter = createRouter()
  .transformer(superjson)
  .formatError(({ shape, error }) => {
    const isZodErr = error.cause instanceof ZodError;
    if (!isZodErr) {
      console.error(error);
      return shape;
    }
    return {
      code: 400,
      message: 'Invalid user input',
      data: {},
    };
  })
  .merge('auth.', authRouter)
  .merge('user.', userRouter)
  .merge('blood-storage.', bloodStorageRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
