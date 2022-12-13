# nest-template

A template project to speed up the process of creating new NestJS projects.

After applying this template, it needs to be customized to the needs of a particular service, editing the files as necessary:

- README.md
- package.json
- Dockerfile
- docker-compose.yaml
- buildversion.bat

(For basic template, you only need to do a global search for the nest-template phrase project, and replace all occurrences with the name of your service)

The project is configured using the configuration.yml file, which should be located in the root of the project

## Available settings in configuration.yml

```

# Application launch mode
NODE_ENV: development

# Application Port
PORT: 3000

# Time zone
UTC_OFFSET: +05:00

```
