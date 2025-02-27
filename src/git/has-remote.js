export async function hasRemote(git) {
  const remotes = await git.getRemotes();
  return !(remotes.length === 0);
}
