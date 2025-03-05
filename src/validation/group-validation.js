import { config } from '../util/config.js';

export function validateGroup(group) {
  return config.group.indexOf(group) !== -1;
}
