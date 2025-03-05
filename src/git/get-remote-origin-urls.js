export async function getRemoteOriginUrls(git) {
  const config = await git.getConfig('remote.origin.url');
  return config ? config.values : [];
}
