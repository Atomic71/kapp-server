import pino, { LoggerOptions } from 'pino';
import { logflarePinoVercel } from 'pino-logflare';
import { env } from '../../env/server.mjs';

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
  apiKey: env.LOGFLARE_API_KEY,
  sourceToken: env.LOGFLARE_SOURCE_TOKEN,
});
console.log(process.env.NODE_ENV);
// create pino loggger

const pinoOptions: LoggerOptions = {
  browser: {
    transmit: {
      level: 'info',
      send: send,
    },
  },
  level: 'debug',
  base: {
    env: process.env.VERCEL_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
};

const logger = pino(pinoOptions, stream);

export default logger;
