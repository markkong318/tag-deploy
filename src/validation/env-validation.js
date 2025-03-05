import { config } from '../util/config.js';

export function validateEnv(env) {
  return config.env.indexOf(env) !== -1;
}
