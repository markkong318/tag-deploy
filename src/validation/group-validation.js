export function validateGroup(group) {
  if (group !== 'all' && group !== 'normal' && group !== 'ts') {
    return false;
  }

  return true;
}
