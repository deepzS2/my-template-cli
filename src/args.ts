import chalk = require('chalk')
import * as yargs from 'yargs'
import { Args, GetArgumentArgs, TypeArgument, YargvType } from './@types/global'

const args = (yargs as YargvType)
	.usage('Usage: dpzt [projectName] [options]')
	.option('template', {
		type: 'string',
		alias: 't',
		description: 'Nome do template que será utilizado',
	})
	.option('typescript', {
		type: 'boolean',
		alias: 'ts',
		description: 'O projeto irá utilizar typescript',
	})
	.option('git', {
		type: 'boolean',
	})
	.option('install', {
		type: 'boolean',
		alias: 'i',
		description: 'Instala as dependências do projeto',
	})
	.example(
		'$0 novoProjeto --ts --git --template next',
		"Gera um projeto Next, utilizando Typescript, com inicialização do Git e com nome 'novoProjeto'"
	)
	.help('help', 'Comando de ajuda', true)

export const availableArgs: Array<keyof Args> = [
	'ts',
	'template',
	't',
	'typescript',
	'install',
	'git',
]

export const getArgument = <T extends 'string' | 'boolean'>({
	keys,
	type,
}: GetArgumentArgs<T>): TypeArgument<T> => {
	if (!keys) return undefined

	if (!keys.every((key) => availableArgs.includes(key))) {
		console.error(
			chalk.red.bold(
				`Argument ${keys.join(' or ')} do not exists in available args array!`
			)
		)

		return undefined
	}

	const argument = keys.reduce<TypeArgument<T> | undefined>(
		(prev, current) =>
			prev !== undefined || args.argv[current] !== undefined
				? args.argv[current]
				: undefined,
		undefined
	)

	if (argument === undefined || typeof argument !== type) return undefined

	return argument as TypeArgument<T>
}

export const getArgumentIndex = (index: number): string | number =>
	args.argv['_'][index]

export default args
