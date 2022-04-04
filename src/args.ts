import * as yargs from 'yargs'
import { Args } from './@types/global'

const args = yargs(process.argv.slice(2))
	.scriptName('detc')
	.usage('Usage: $0 [projectName] [options]')
	.options({
		template: {
			type: 'string',
			alias: 't',
			description: 'Nome do template que será utilizado',
		},
		typescript: {
			type: 'boolean',
			alias: 'ts',
			description: 'O projeto irá utilizar typescript',
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
		'$0 novoProjeto --ts --git --template next',
		"Gera um projeto Next, utilizando Typescript, com inicialização do Git e com nome 'novoProjeto'"
	)
	.example(
		'$0',
		'Gera um novo projeto com base nas respostas das perguntas que serão feitas'
	)
	.help('help', 'Comando de ajuda', true)
	.alias('help', 'h')

export const getArgument = <T extends string | boolean>(key: keyof Args) => {
	if (!key && args.argv instanceof Promise) return undefined

	const argument = args.argv[key]

	if (argument !== undefined) {
		return argument as T
	}

	return undefined
}

export const getArgumentIndex = (index: number): string | number =>
	args.argv['_'][index]

export default args
