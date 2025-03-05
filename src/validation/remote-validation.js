import { getRemoteOriginUrls } from '../git/get-remote-origin-urls.js';
import { config } from '../util/config.js';

export async function validateRemote(git) {
  if (config.remote === '*') {
    return true;
  }

  const remotes = await getRemoteOriginUrls(git);
  return remotes.indexOf(config.remote) !== -1;
}
