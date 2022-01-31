import * as inquirer from 'inquirer'
import * as path from 'path'
import * as yargs from 'yargs'

import { Args, CliOptions } from './@types/global'
import createProject from './createProject'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'
import shouldDisplayHelpMessage from './help'
import Templates from './templates'
import ErrorCLI from './utils/error'
import {
	firstQuestions,
	lastQuestions,
	createChoiceQuestion,
} from './questions'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm
const args = yargs.argv as Args

export default async function promptQuestions() {
	if (shouldDisplayHelpMessage(args)) process.exit()

	const nameArg = args['_'][0] as string
	const templateArg = args.template || args.t

	if (!REGEX_NAME.test(nameArg)) {
		throw new ErrorCLI(
			'Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
	}

	const questions = firstQuestions(args)
	const firstAnswers = await inquirer.prompt(questions)

	const projectName = firstAnswers.name || nameArg

	const templates = new Templates(firstAnswers.ts || !!args.ts)
	const templatesAvailable = templates.getAllTemplatesFromPath()

	const templateQuestion = createChoiceQuestion(
		'template',
		'Qual template você gostaria de utilizar?',
		templatesAvailable.map((choice) => choice.name),
		() => typeof templateArg !== 'string'
	)

	const { template: templateName } = await inquirer.prompt(templateQuestion)
	const templatePath = templates.getTemplatePath(templateName || templateArg)

	if (!templatePath) {
		throw new ErrorCLI('Não encontrei um template com esse nome')
	}

	const targetPath = path.join(process.cwd(), projectName)
	const lastAnswers = await inquirer.prompt(lastQuestions(args))

	const options: CliOptions = {
		projectName,
		templateName,
		templatePath,
		targetPath,
		useTypescript: firstAnswers.ts || !!args.ts,
		runInstall: lastAnswers.runInstall || !!args.install,
		runGitInit: lastAnswers.git || !!args.git,
	}

	if (!createProject(targetPath)) return

	createDirectoryContents(templatePath, projectName)
	postProcess(options)
}
