import * as chalk from 'chalk'
import * as yargs from 'yargs'

import { GetArgumentArgs, TypeArgument } from './@types/global'
import ErrorCLI from './utils/error'

const args = yargs(process.argv.slice(2))
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
	.help('help', 'Comando de ajuda', true)

export const argumentsParsed = args.parseSync()

const isArgumentAvailable = (key: string) =>
	Object.keys(argumentsParsed).includes(key)

export const getArgument = <T extends 'string' | 'boolean'>({
	key,
	type,
}: GetArgumentArgs<T, typeof argumentsParsed>): TypeArgument<T> => {
	if (!key && args.argv instanceof Promise) return undefined

	if (isArgumentAvailable(typeof key === 'number' ? key.toString() : key)) {
		throw new ErrorCLI(
			`Argumento '${key}' não existe nos argumentos disponíveis! Tente adicioná-lo ao yargs no arquivo ${chalk.bold.green(
				'args.ts'
			)}!`
		)
	}

	const argument = args.argv[key]

	if (argument === undefined || typeof argument !== type) return undefined

	return argument as TypeArgument<T>
}

export const getArgumentIndex = (index: number): string | number =>
	args.argv['_'][index]

export default args
