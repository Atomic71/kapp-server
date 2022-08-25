import { APP_STREAM_LOGGER } from './../../../server/logger/logger';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/router';
import { createContext } from '../../../server/router/context';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError: (ctx) => {
    APP_STREAM_LOGGER.error(
      {
        NAME: ctx.error.name,
        ORIGIN: 'ROUTER ROOT',
        ERROR: {
          msg: ctx.error.message,
          path: ctx.path,
        },
        REQUEST: {
          input: ctx.input,
          headers: ctx.req.headers,
        },
      },
      '123'
    );
    return {};
  },
});
