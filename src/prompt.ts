import * as inquirer from 'inquirer'
import * as path from 'path'

import { initialQuestion, shellQuestions, templateQuestion } from './models'
import { Args, CliOptions } from './@types/global'

import args, { getArgumentIndex, getArgument } from './args'
import createProject from './createProject'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'
import Templates from './templates'
import ErrorCLI from './utils/error'
import nextTemplateQuestions from './models/templates/nextTemplateQuestions'
import parseTemplateOptions from './utils/parseTemplateOptions'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

export default async function promptQuestions() {
	const argv = args.argv as Args

	if (argv.help) {
		args.showHelp()
		process.exit()
	}

	const nameArg = getArgumentIndex(0) as string
	const templateArg = getArgument({ type: 'string', keys: ['template', 't'] })

	if (!REGEX_NAME.test(nameArg)) {
		throw new ErrorCLI(
			'Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
	}

	const initialAnswers = await inquirer.prompt(
		initialQuestion(args.argv as Args)
	)

	const projectName = initialAnswers.name || nameArg
	const useTypescript =
		getArgument({ type: 'boolean', keys: ['ts'] }) || initialAnswers.ts

	const templates = new Templates(useTypescript)

	const { template: questionTemplateName } = await inquirer.prompt(
		templateQuestion(args.argv as Args, templates)
	)
	const templateName = templateArg || questionTemplateName
	const templatePath = templates.getTemplatePath(templateName)

	if (!templatePath) {
		throw new ErrorCLI('Não encontrei um template com esse nome')
	}

	const targetPath = path.join(process.cwd(), projectName)
	const shellAnswers = await inquirer.prompt(shellQuestions(args.argv as Args))

	const options: CliOptions = {
		projectName,
		templateName,
		templatePath,
		targetPath,
		useTypescript,
		runInstall:
			getArgument({ type: 'boolean', keys: ['install'] }) ||
			shellAnswers.runInstall,
		runGitInit:
			getArgument({ type: 'boolean', keys: ['git'] }) || shellAnswers.git,
	}

	if (!createProject(targetPath)) return

	if (options.templateName.toLowerCase() === 'next') {
		const { templateOptions } = await inquirer.prompt(nextTemplateQuestions())
		createDirectoryContents(
			templatePath,
			projectName,
			templateOptions,
			parseTemplateOptions('next', templateOptions)
		)
	} else {
		createDirectoryContents(templatePath, projectName)
	}

	postProcess(options)
}
