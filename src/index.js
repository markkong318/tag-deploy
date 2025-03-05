#!/usr/bin/env node

import pkg from '@caporal/core';
import chalk from 'chalk';
import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import { fetch } from './git/fetch.js';
import { generateTag } from './git/generate-tag.js';
import { pushTag } from './git/push-tag.js';
import { validateEnv } from './validation/env-validation.js';
import { validateGroup } from './validation/group-validation.js';
import { config } from './util/config.js';
import { validateRemote } from './validation/remote-validation.js';

const { program } = pkg;

const git = simpleGit();

if (process.argv.length === 2) {
  process.argv.push('--help');
}

program
  .version('1.0.0')
  .description('A CLI tool to pull all Git tags and create a new tag')
  .argument('<env>', `Environment name (e.g., ${config.env.join(', ')})`)
  .argument('<group>', `Group name (e.g., ${config.group.join(', ')})`)
  .argument('[append]', 'Append to the tag name', { default: '' })
  .option('--dry', 'Run the command in dry-run mode (no changes will be made)', { default: false })
  .action(async ({ args, options, logger }) => {
    const { env, group, append } = args;
    const { dry } = options;

    if (!validateEnv(env)) {
      console.log(`Env is not valid: ${env}`);
      process.exit(1);
    }

    if (!validateGroup(group)) {
      console.log(`Group is not valid: ${env}`);
      process.exit(1);
    }

    if (! await validateRemote(git)) {
      console.log(`remote is not valid`);
      process.exit(1);
    }

    try {
      await fetch(git);

      const log = await git.log({ maxCount: 1, development: null });

      console.log('');
      const latestCommit = log.latest;
      if (latestCommit) {
        console.log(`${chalk.bold.underline('Prepare to release based on the commit:')}`);
        console.log(`${chalk.bold('Hash:')} ${latestCommit.hash}`);
        console.log(`${chalk.bold('Author:')} ${latestCommit.author_name} <${latestCommit.author_email}>`);
        console.log(`${chalk.bold('Date:')} ${latestCommit.date}`);
        console.log(`${chalk.bold('Message:')} ${latestCommit.message}`);
      } else {
        console.log('No commits found in the repository.');
      }
      console.log('');

      let tagName = await generateTag(git, env, group);
      if (append) {
        tagName += `-${append.replace(/\s+/g, '-')}`;
      }

      console.log(`${chalk.bold('New tag:')} ${tagName}`);
      console.log('');

      if (env === 'prod') {
        console.log(`${chalk.red.bold('You are about to create a new tag in the PRODUCTION environment.')}`);
      }

      try {
        const { confirmPush } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirmPush',
            message: `Are you sure you want to push the new tag "${tagName}"?`,
            default: false,
          },
        ]);

        if (!confirmPush) {
          console.log('Operation canceled. The tag was not pushed.');
          process.exit(0);
        }
      } catch (e) {
        console.log('');
      }

      if (dry) {
        return;
      }

      await git.raw(['tag', tagName, latestCommit.hash])

      console.log(`Pushing new tag: ${tagName}...`);
      await pushTag(git, tagName)
      console.log(`Tag "${tagName}" created and pushed successfully`);

      console.log()
    } catch (error) {
      console.log(error);
      console.log(`Error: An error occurred: ${error.message}`);
      process.exit(1);
    }
  });

program.run();
