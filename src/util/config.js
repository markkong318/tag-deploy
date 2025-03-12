import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @typedef {Object} Config
 * @property {string[]} env - List of environments
 * @property {string[]} group - List of groups
 * @property {string} branch - Branch name
 * @property {string} remote - Remote name
 * @property {Object.<string, Object.<string, string>>} view - View
 */

/**
 * @type {Config}
 */
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
