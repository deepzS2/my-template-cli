import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import * as yargs from 'yargs'

import createProject from './createProject'
import { Args, CliOptions } from './@types/global'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'
import chalk = require('chalk')

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
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
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
	const name = args['_'][0] as string

	if (!REGEX_NAME.test(name)) {
		console.log(
			chalk.bold.red('ERROR') +
				' Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
		process.exit(1)
	}

	const answers = await inquirer.prompt(INITIAL_QUESTIONS)

	answers.name = name
	answers.ts = !!args['ts']

	const projectName = answers['name']
	const useTypescript = answers.ts ? 'typescript' : 'javascript'

	const templatesLanguagePath = path.join(__dirname, 'templates', useTypescript)

	const { template: projectTemplate, runInstall } = await inquirer.prompt(
		getFinalQuestions(fs.readdirSync(templatesLanguagePath))
	)

	const templatePath = path.join(templatesLanguagePath, projectTemplate)
	const targetPath = path.join(process.cwd(), projectName)

	const options: CliOptions = {
		projectName,
		templateName: projectTemplate,
		templatePath,
		targetPath,
		useTypescript: answers.ts,
		runInstall,
		runGitInit: answers.git,
	}

	if (!createProject(targetPath)) return

	createDirectoryContents(templatePath, projectName)
	postProcess(options)

	console.log(options)
}
