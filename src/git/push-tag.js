import { hasRemote } from './has-remote.js';

export async function pushTag(git, tagName) {
  if (!await hasRemote(git)) {
    return;
  }

  await git.push('origin', `refs/tags/${tagName}`);
}
