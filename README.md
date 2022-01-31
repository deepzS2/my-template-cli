# deepz templates cli
**deepz templates cli** is a [NodeJS](https://nodejs.org) CLI to generate projects using my most common configuration with [Eslint](https://eslint.org), [Prettier](https://prettier.io) and even [TypeScript](https://www.typescriptlang.org). 

Feel free to fork this project or use it yourself! Any recommendations or suggestions are welcome.

## How it works?
Every file on [src folder](src) will handle each task like [prompt questions](src/prompt.ts), [create directory content](src/createDirectoryContents.ts), etc.

When creating the a new project the script will use the [templates](src/templates/) folder to search for the corresponding template, like: When you want to use [Express](https://expressjs.com) with JavaScript you it will search for the template inside [JavaScript folder](src/templates/javascript) and get the Express folder.

Note that the script will use the name of the template folder when using the CLI, so if the folder is named hElO on the console it will look exactly the same and 
will be case insensitive with `-t, --template` option.

## How I can use it?
You can use `dpzt --help` or `dpzt -h` to check the usage and options you can provide:
```
Usage: dpzt [name] [options]

Options:

  -h, --help              Informações dos comandos
  --ts                    O projeto utilizará TypeScript
  --git                   Iniciar um repositório do GitHub com o projeto
  --install               Instalar as dependências do projeto
  -t, --template <name>   Template que será utilizado
```

## TODOs
- [x] More README content
- [x] Express with Typescript template
- [ ] React with JavaScript and TypeScript template
- [ ] React Native with JavaScript and TypeScript template
- [x] Next with JavaScript and TypeScript template
- [ ] English translation?
- [ ] Component generation? (`dpzt generate`)
- [ ] Database config generation? (`dpzt database`)