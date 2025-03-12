import { config } from './config.js';

export async function renderView(env, group) {
  const views = config.view;

  const envView = views['*'] ? views['*'] : views[env];
  if (!envView) {
    return '';
  }

  const groupView = envView['*'] ? envView['*'] : envView[group];
  if (!groupView) {
    return '';
  }

  return groupView;
}
