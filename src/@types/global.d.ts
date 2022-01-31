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
	[x: string]: unknown
	_: (string | number)[]
	template: string
	t: string
	ts: boolean
	install: boolean
	git: boolean
	$0: string
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
