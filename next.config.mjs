import { env } from './src/env/server.mjs';
import withPWA from 'next-pwa';
console.log(env);
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const wpaConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});

delete wpaConfig.pwa;

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  ...wpaConfig,
});
