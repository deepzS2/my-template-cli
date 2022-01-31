import * as chalk from 'chalk'
import * as inquirer from 'inquirer'
import * as path from 'path'
import * as yargs from 'yargs'

import createProject from './createProject'
import { Args, CliOptions } from './@types/global'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'
import shouldDisplayHelpMessage from './help'
import { getAllTemplatesFromPath, getTemplatePath } from './getTemplatePath'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm
const args = yargs.argv as Args

const INITIAL_QUESTIONS: inquirer.QuestionCollection<Questions1> = [
	{
		name: 'name',
		type: 'input',
		message: 'Nome do projeto:',
		when: () => args['_'].length === 0,
		validate: (input) => REGEX_NAME.test(input),
	},
	{
		name: 'ts',
		type: 'confirm',
		message: 'Gostaria de utilizar TypeScript?',
		default: true,
		when: () => args['ts'] === undefined,
	},
	{
		name: 'git',
		type: 'confirm',
		message: 'Gostaria de inicializar um repositório git?',
		default: false,
		when: () => args['git'] === undefined,
	},
]

const getFinalQuestions = (
	choices: string[]
): inquirer.QuestionCollection<Questions2> => [
	{
		name: 'template',
		type: 'list',
		message: 'Qual template você gostaria de utilizar?',
		choices: choices,
		when: () =>
			typeof args['template'] !== 'string' && typeof args['t'] !== 'string',
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
		when: () => args['install'] === undefined,
	},
]

interface Questions1 {
	name: string
	ts: boolean
	git: boolean
}

interface Questions2 {
	template: string
	runInstall: boolean
}

export default async function promptQuestions() {
	if (shouldDisplayHelpMessage(args)) process.exit()

	const name = args['_'][0] as string
	const template = (args['template'] as string) || (args['t'] as string)

	if (!REGEX_NAME.test(name)) {
		console.log(
			chalk.bold.red('ERROR') +
				' Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
		process.exit(1)
	}

	const answers = await inquirer.prompt(INITIAL_QUESTIONS)

	const projectName = answers['name'] || name
	const useTypescript = answers.ts || !!args['ts'] ? 'typescript' : 'javascript'

	const templatesLanguagePath = path.join(__dirname, 'templates', useTypescript)

	const { template: projectTemplate, runInstall } = await inquirer.prompt(
		getFinalQuestions(getAllTemplatesFromPath(templatesLanguagePath))
	)

	const templatePath = getTemplatePath(
		projectTemplate || template,
		templatesLanguagePath
	)

	if (!templatePath) {
		console.log(
			chalk.bold.red('ERROR') +
				' ' +
				chalk.bold('Não encontrei um template com esse nome')
		)

		process.exit(1)
	}

	const targetPath = path.join(process.cwd(), projectName)

	const options: CliOptions = {
		projectName,
		templateName: projectTemplate,
		templatePath,
		targetPath,
		useTypescript: answers.ts || !!args['ts'],
		runInstall: runInstall || !!args['install'],
		runGitInit: answers.git || !!args['git'],
	}

	if (!createProject(targetPath)) return

	createDirectoryContents(templatePath, projectName)
	postProcess(options)
}
