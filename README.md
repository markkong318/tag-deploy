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
