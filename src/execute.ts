import * as chalk from 'chalk'
import * as inquirer from 'inquirer'
import * as path from 'path'

import { CliOptions } from './@types/global'
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

	// Why async?
	if (argv instanceof Promise)
		throw new ErrorCLI(
			'yargs.argv do tipo ' + chalk.bold.red('Promise') + '...'
		)

	// Help message
	if (argv.help) {
		args.showHelp()
		process.exit()
	}

	// Args passed from command line
	const passedArgs = {
		name: getArgumentIndex(0) as string,
		template: getArgument<string>('template'),
		typescript: getArgument<boolean>('typescript'),
		install: getArgument<boolean>('install'),
		git: getArgument<boolean>('git'),
	}

	// If name arg exist make a regex test
	if (!REGEX_NAME.test(passedArgs.name)) {
		throw new ErrorCLI(
			'Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
	}

	const initialAnswers = await inquirer.prompt(initialQuestion)

	const projectName = passedArgs.name || initialAnswers.name
	const useTypescript = passedArgs.typescript || initialAnswers.ts

	// Util template class
	const templates = new Templates(useTypescript)

	const { template: questionTemplateName } = await inquirer.prompt(
		templateQuestion(templates)
	)

	// Template information
	const templateName = passedArgs.template || questionTemplateName
	const templatePath = templates.getTemplatePath(templateName)

	if (!templatePath) {
		throw new ErrorCLI('Não encontrei um template com esse nome')
	}

	const targetPath = path.join(process.cwd(), projectName)
	const shellAnswers = await inquirer.prompt(shellQuestions)

	const options: CliOptions = {
		projectName,
		templateName,
		templatePath,
		targetPath,
		useTypescript,
		runInstall: passedArgs.install || shellAnswers.runInstall,
		runGitInit: passedArgs.git || shellAnswers.git,
	}

	if (!createProject(targetPath)) return

	// Sub questions per template
	if (options.templateName.toLowerCase() === 'next') {
		const { templateOptions } = await inquirer.prompt(nextTemplateQuestions)

		createDirectoryContents(
			templatePath,
			projectName,
			templateOptions,
			parseTemplateOptions('next', templateOptions)
		)
	} else {
		createDirectoryContents(templatePath, projectName)
	}

	// Post process
	postProcess(options)
}
