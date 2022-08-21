import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';
import { env } from '../../env/server.mjs';

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
  apiKey: env.LOGFLARE_API_KEY,
  sourceToken: env.LOGFLARE_SOURCE_TOKEN,
});

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: 'debug',
    base: {
      processes_str: JSON.stringify(process.versions),
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream
);

export default logger;
