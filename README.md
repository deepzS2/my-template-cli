# deepz templates cli
**deepz templates cli** é um [NodeJS](https://nodejs.org) CLI para gerar projetos usando as configurações mais comuns com [Eslint](https://eslint.org), [Prettier](https://prettier.io) e até mesmo [TypeScript](https://www.typescriptlang.org). 

Sinta-se livre para dar fork no projeto ou usa-lo! Qualquer recomendação ou sugestão é bem-vinda.

## Como funciona?
Todos os arquivos dentro da pasta [src](src) terá sua respectiva tarefa como [dar prompt das perguntas](src/prompt.ts), [criar conteúdo dos diretórios](src/createDirectoryContents.ts), etc.

Quando criar um novo projeto o script irá utilizar a pasta [templates](src/templates/) para procurar pelo template correspondente, como por exemplo: Se você deseja utilizar o template [Express](https://expressjs.com) com JavaScript você vai o respectivo template dentro da pasta [javascript](src/templates/javascript/) e pegar a pasta [Express](src/templates/javascript/Express/)

Note que o script irá utilizar os nomes das pastas como opções de templates, então se você tiver uma pasta chamada `vIrUs`, no terminal ele vai ter exatamente o mesmo nome e será `case insensitive` com a opção `-t, --templates`.

## Como posso usar?
O projeto, por enquanto, não foi publicado no NPM, porém futuramente será!

Primeiramente você deve clonar o projeto e rodar no seu terminal `yarn build`, ele irá rodar os scripts de build e fazer um link

Você pode usar `dpzt --help` ou `dpzt -h` para ver a mensagem de ajuda do CLI
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
- [x] Mais conteúdo no README
- [ ] Mais templates
- [x] Sub perguntas para cada template
- [x] Mudar nome de arquivos para usar com sub perguntas de templates
- [ ] I18n?
- [ ] Gerar componentes? (`dpzt generate`)
- [ ] Gerar configuração de database? (`dpzt database`)
- [ ] .NET templates?