import * as inquirer from 'inquirer'
import * as path from 'path'
import * as yargs from 'yargs'

import { initialQuestion, shellQuestions, templateQuestion } from './models'
import { Args, CliOptions } from './@types/global'
import createProject from './createProject'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'
import shouldDisplayHelpMessage from './help'
import Templates from './templates'
import ErrorCLI from './utils/error'
import nextTemplateQuestions from './models/templates/nextTemplateQuestions'
import parseTemplateOptions from './utils/parseTemplateOptions'

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

	const initialAnswers = await inquirer.prompt(initialQuestion(args))

	const projectName = initialAnswers.name || nameArg
	const useTypescript = initialAnswers.ts || !!args.ts

	const templates = new Templates(useTypescript)

	const { template: templateName } = await inquirer.prompt(
		templateQuestion(args, templates)
	)
	const templatePath = templates.getTemplatePath(templateName || templateArg)

	if (!templatePath) {
		throw new ErrorCLI('Não encontrei um template com esse nome')
	}

	const targetPath = path.join(process.cwd(), projectName)
	const shellAnswers = await inquirer.prompt(shellQuestions(args))

	const options: CliOptions = {
		projectName,
		templateName,
		templatePath,
		targetPath,
		useTypescript,
		runInstall: shellAnswers.runInstall || !!args.install,
		runGitInit: shellAnswers.git || !!args.git,
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
