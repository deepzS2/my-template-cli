export interface CliOptions {
	projectName: string
	templateName: string
	templatePath: string
	targetPath: string
	useTypescript: boolean
	runInstall: boolean
	runGitInit: boolean
}

export interface Args {
	template: string | undefined
	typescript: boolean | undefined
	git: boolean | undefined
	install: boolean | undefined
}

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
