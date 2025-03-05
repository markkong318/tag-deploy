import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function loadConfig() {
  const configPath = path.resolve(fileURLToPath(path.dirname(import.meta.url)), '../../config.json');
  try {
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading or parsing config file: ${err.message}`);
    return null;
  }
}

export const config = loadConfig();
