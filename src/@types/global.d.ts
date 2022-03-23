import * as yargs from 'yargs'

export interface CliOptions {
	projectName: string
	templateName: string
	templatePath: string
	targetPath: string
	useTypescript: boolean
	runInstall: boolean
	runGitInit: boolean
}

export interface Args extends ArgsGeneric {
	template: string
	typescript: boolean | undefined
	install: boolean | undefined
	git: boolean | undefined
	help: boolean | undefined
	h: boolean | undefined
}

interface ArgsGeneric {
	[x: string]: unknown
	$0: string
	_: Array<string | number>
}

export type YargvType = yargs.Argv<Args>

export interface ITemplate {
	name: string
	dir: string
}

export interface Questions1 {
	name: string
	ts: boolean
	git: boolean
}

export interface Questions2 {
	template: string
	runInstall: boolean
}

interface IQuestions {
	name: string
	ts: boolean
	git: boolean
	template: string
	runInstall: boolean
}

interface GetArgumentArgs<T, K> {
	type: T
	key: keyof K
}

type TypeArgument<T extends 'string' | 'boolean'> = T extends 'string'
	? string | undefined
	: boolean | undefined
