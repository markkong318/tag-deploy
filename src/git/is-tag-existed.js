export async function isTagExisted(git, tagName) {
  try {
    const result = await git.raw(['tag', '-l', tagName]);
    return result.trim() === tagName;
  } catch (error) {
    console.error('Error checking tag:', error);
    return false;
  }
}
