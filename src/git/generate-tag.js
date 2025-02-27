import { isTagExisted } from './is-tag-existed.js';

export async function generateTag (git, env, group) {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');

  let tagName = `${env}-${group}-${today}`;
  let suffix = 1;

  while (await isTagExisted(git, tagName)) {
    tagName = `${env}-${group}_${today}_${suffix}`;
    suffix++;
  }

  return tagName;
}
