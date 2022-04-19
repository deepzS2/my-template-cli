import { ArgumentsCamelCase } from 'yargs'

// =================== CLI Options ===================
export interface CliOptions {
	projectName: string
	templateName: string
	templatePath: string
	targetPath: string
	language: string
	runInstall: boolean
	runGitInit: boolean
}

// =================== Arguments for script ===================
export type ScriptArguments = ArgumentsCamelCase<{
	projectName?: string
	template?: string
	language?: 'TypeScript' | 'C#'
	git?: boolean
	install?: boolean
}>

export type GenerateScriptArguments = ArgumentsCamelCase<{
	name?: string
	language?: string
}>

// =================== Template ===================
export interface ITemplate {
	name: string
	dir: string
}
