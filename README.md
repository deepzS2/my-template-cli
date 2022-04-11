# deepz templates cli
**deepz templates cli** é um [NodeJS](https://nodejs.org) CLI para gerar projetos usando as configurações mais comuns de [TypeScript](https://www.typescriptlang.org) ([Eslint](https://eslint.org) e [Prettier](https://prettier.io)), C# e futuramente irá conter diversas outras linguagens. 

Sinta-se livre para dar fork no projeto ou usa-lo! Qualquer recomendação ou sugestão é bem-vinda.

## Como funciona?
Todos os arquivos dentro da pasta [src](src) terá sua respectiva tarefa como [dar prompt das perguntas](src/prompt.ts), [criar conteúdo dos diretórios](src/createDirectoryContents.ts), etc.

Quando criar um novo projeto o script irá utilizar a pasta [templates](src/templates/) para procurar pelo template correspondente, como por exemplo: Se você deseja utilizar o template [Express](https://expressjs.com) com Typescript você vai o respectivo template dentro da pasta [typescript](src/templates/typescript/) e pegar a pasta [Express](src/templates/typescript/Express/)

Note que o script irá utilizar os nomes das pastas como opções de templates, então se você tiver uma pasta chamada `vIrUs`, no terminal ele vai ter exatamente o mesmo nome e será `case insensitive` com a opção `-t, --templates`.

## Como posso usar?
O projeto, por enquanto, não foi publicado no NPM, porém futuramente será!

Primeiramente você deve clonar o projeto e rodar no seu terminal `yarn build`, ele irá rodar os scripts de build e fazer um link

Você pode usar `dpzt --help` ou `dpzt -h` para ver a mensagem de ajuda do CLI
```
detc [projectName] [options]

Gera um projeto a partir de um template

Positionals:
  projectName  Nome do projeto                                          [string]

Options:
      --version           Show version number                          [boolean]
  -t, --template          Nome do template que será utilizado           [string]
      --language, --lang  Linguagem que vai ser utilizada
                                     [choices: "javascript", "typescript", "c#"]
  -g, --git               Inicializa o git                             [boolean]
  -i, --install           Instala as dependências do projeto           [boolean]
  -h, --help              Comando de ajuda                             [boolean]

Examples:
  detc novoProjeto --language typescript    Gera um projeto Next, utilizando
  --git --template next                     Typescript, com inicialização do Git
                                            e com nome 'novoProjeto'
  detc                                      Gera um novo projeto com base nas
                                            respostas das perguntas que serão
                                            feitas
```

## TODOs
- [x] Mais conteúdo no README
- [ ] Mais templates? (C# - .NET, React Native)
- [x] Sub perguntas para cada template
- [x] Mudar nome de arquivos para usar com sub perguntas de templates
- [ ] I18n?
- [ ] Gerar componentes? (`dpzt generate`)
- [ ] Gerar configuração de database? (`dpzt database`)