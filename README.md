# tag-deploy

Tag your branch with deploy tags in environment

## Show help

```
npx tag-deploy

  tag-deploy 1.0.0 — A CLI tool to pull all Git tags and create a new tag

  USAGE 
  
    ▸ tag-deploy <env> <group> [append] [OPTIONS...]


  ARGUMENTS

    <env>                                Environment name (e.g., dev, stg, stgqa, preprod, prod)
    <group>                              Group name (e.g., all, normal, ts)                     
    [append]                             Append to the tag name                                 
                                         default: ""                                            

  OPTIONS

    --dry                                Run the command in dry-run mode (no changes will be    
                                         made)                                                  

  GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.           
    -V, --version                        Display version.                                       
    --no-color                           Disable use of colors in output.                       
    -v, --verbose                        Verbose mode: will also output debug messages.         
    --quiet                              Quiet mode - only displays warn and error messages.    
    --silent                             Silent mode: does not output anything, giving no       
                                         indication of success or failure other than the exit   
                                         code.                           
```

## Add tag to your repository

```
npx tag-deploy stgqa all
```

## Create your own tag-deploy command

### Create node project

In your project

```
npm init
```

### Modify package.json

```
{
  "name": "my-deploy",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "bin": {
    "my-deploy": "src/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "tag-deploy": "^1.0.2"
  }
}
```

### Create index.js

Create a new file on src/index.js

```
#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';

global.BASE_DIR = path.resolve(fileURLToPath(path.dirname(import.meta.url)), '..');

await import('tag-deploy/src/index.js');
```

In this file, you could also define your tag format. Please check the source in src/git/generate-tag.js

```
global.GENERATE_TAG_FUNC = async (git, env, group, append) => {
  ...
}
```

### Install to global

```
npm i -g .
```

### Test it

```
my-deploy
```
