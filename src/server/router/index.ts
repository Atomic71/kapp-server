// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
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
  .merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
