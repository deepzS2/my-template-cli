import { constructYargs } from '../args'

export interface CliOptions {
	projectName: string
	templateName: string
	templatePath: string
	targetPath: string
	language: string
	runInstall: boolean
	runGitInit: boolean
}

export interface Args {
	template: string | undefined
	language: 'TypeScript' | 'JavaScript' | 'C#'
	typescript: boolean | undefined
	git: boolean | undefined
	install: boolean | undefined
}

export type YargsType = ReturnType<typeof constructYargs>
export type ArgumentsType = Awaited<YargsType['argv']>

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
