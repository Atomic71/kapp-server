import pino, { LoggerOptions } from 'pino';
import { createWriteStream, logflarePinoVercel } from 'pino-logflare';
import { env } from '../../env/server.mjs';

const { stream, send } = logflarePinoVercel({
  apiKey: env.LOGFLARE_API_KEY,
  sourceToken: env.LOGFLARE_SOURCE_TOKEN,
});

export const APP_STREAM_LOGGER = pino(
  { level: 'debug' },
  createWriteStream({
    apiKey: env.LOGFLARE_API_KEY,
    sourceToken: env.LOGFLARE_SOURCE_TOKEN,
  })
);

const pinoOptions: LoggerOptions = {
  browser: {
    transmit: {
      level: 'info',
      send: send,
    },
  },
  level: 'debug',
  base: {
    env: 'production' || process.env.VERCEL_ENV || process.env.NODE_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
};

export default pino(pinoOptions, stream);
