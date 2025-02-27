import { hasRemote } from './has-remote.js';

export async function pushTag(git, tagName) {
  if (!await hasRemote(git)) {
    console.log('')
    return;
  }

  await git.push('origin', `refs/tags/${tagName}`);
}
