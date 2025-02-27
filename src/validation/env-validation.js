export function validateEnv (env) {
  if (env !== 'dev' && env !== 'stg' && env !== 'stgqa' && env !== 'preprod' && env !== 'prod') {
    return false;
  }

  return true;
}
