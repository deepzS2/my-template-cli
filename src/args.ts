import yargs from 'yargs'

import { GenerateScriptArguments, ScriptArguments } from '@/@types/global'
import defaultCommand from '@commands/default'
import generate from '@commands/generate'

const yargsInstance = yargs(process.argv.slice(2))
	.scriptName('detc')
	.command({
		command: '$0 [projectName]',
		describe: 'Gera um novo projeto',
		builder: (constructArgs) => {
			return constructArgs
				.options({
					template: {
						type: 'string',
						alias: 't',
						description: 'Nome do template que será utilizado',
					},
					language: {
						choices: ['typescript', 'c#'] as const,
						alias: 'lang',
						description: 'Linguagem que vai ser utilizada',
					},
					git: {
						type: 'boolean',
						alias: 'g',
						description: 'Inicializa o git',
					},
					install: {
						type: 'boolean',
						alias: 'i',
						description: 'Instala as dependências do projeto',
					},
				})
				.example(
					'$0',
					'Gera um novo projeto com base nas respostas das perguntas que serão feitas'
				)
				.example(
					'$0 novoProjeto --language typescript --git --template next',
					"Gera um projeto Next, utilizando Typescript, com inicialização do Git e com nome 'novoProjeto'"
				)
		},
		handler: (argv) => defaultCommand(argv as ScriptArguments),
	})
	.command({
		command: 'generate [name]',
		describe: 'Gera um componente específico',
		builder: (args) => {
			return args
				.option('language', {
					choices: ['c#', 'typescript'] as const,
					type: 'string',
					alias: 'l',
					description: 'Linguagem que vai ser gerada',
				})
				.example(
					'$0 generate teste --language typescript',
					'Irá fazer uma pergunta de qual componente gerar, com nome de "teste", com typescript'
				)
				.help()
		},
		handler: (args) => generate(args as GenerateScriptArguments),
	})
	.help('help', 'Comando de ajuda', true)
	.alias('help', 'h')

export default yargsInstance
