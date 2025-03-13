import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function getVersion() {
  const packageJsonPath = global.BASE_DIR ?
    path.resolve(global.BASE_DIR, 'package.json') :
    path.resolve(fileURLToPath(path.dirname(import.meta.url)), '../../package.json');

  const data = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(data);
  return packageJson.version;
}
