import { hasRemote } from './has-remote.js';

export async function fetch(git) {
  if (!await hasRemote(git)) {
    return;
  }

  const status = await git.status();
  const currentBranch = status.current;

  if (currentBranch === 'development') {
    await git.fetch('development');
  } else {
    await git.fetch('origin', 'development:development')
  }
}
