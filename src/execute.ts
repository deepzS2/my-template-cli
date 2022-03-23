import * as chalk from 'chalk'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { Args, CliOptions } from './@types/global'
import args, { getArgumentIndex, getArgument } from './args'
import createProject from './createProject'
import createDirectoryContents from './createDirectoryContents'
import {
	initialQuestion,
	shellQuestions,
	templateQuestion,
	nextTemplateQuestions,
} from './models'
import ErrorCLI from './utils/error'
import parseTemplateOptions from './utils/parseTemplateOptions'
import postProcess from './utils/postProcess'
import Templates from './utils/templates'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

export default async function execute() {
	const { argv } = args

	if (argv instanceof Promise)
		throw new ErrorCLI(
			'yargs.argv do tipo ' + chalk.bold.red('Promise') + '...'
		)

	if (argv.help) {
		args.showHelp()
		process.exit()
	}

	const nameArg = getArgumentIndex(0) as string
	const templateArg = getArgument({
		type: 'string',
		key: 'template',
	})

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
		getArgument({ type: 'boolean', key: 'typescript' }) || initialAnswers.ts

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
			getArgument({ type: 'boolean', key: 'install' }) ||
			shellAnswers.runInstall,
		runGitInit:
			getArgument({ type: 'boolean', key: 'git' }) || shellAnswers.git,
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
