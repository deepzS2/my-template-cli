import inquirer from 'inquirer'

import path from 'path'

import { CliOptions, ScriptArguments } from '@/@types/global'
import createDirectoryContents from '@/createDirectoryContents'
import createTargetDirectory from '@/createTargetDirectory'
import {
	initialQuestion,
	nextTemplateQuestions,
	shellQuestions,
	templateQuestion,
	webapiTemplateQuestions,
	expressTemplateQuestions,
} from '@models/index'
import ErrorCLI from '@utils/error'
import parseTemplateOptions from '@utils/parseTemplateOptions'
import postProcess from '@utils/postProcess'
import Templates from '@utils/templates'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

export default async function (argv: ScriptArguments) {
	// Args passed from command line
	// projectName is not a option but instead a positional argument
	// Check yargs.usage documentation
	const passedArgs = {
		name: argv.projectName as string,
		template: argv.template,
		language: argv.language,
		install: argv.install,
		git: argv.git,
	}

	// Help message
	// if (argv.help) {
	// 	yargs.showHelp()
	// 	process.exit()
	// }

	// If name arg exist make a regex test
	if (!!passedArgs && !REGEX_NAME.test(passedArgs.name)) {
		throw new ErrorCLI(
			'Você deve apenas utilizar caracteres, números, underscores ou traços para nome'
		)
	}

	const initialAnswers = await inquirer.prompt(initialQuestion(argv))

	const projectName = passedArgs.name ?? initialAnswers.name
	const language = passedArgs.language ?? initialAnswers.language.toLowerCase()

	// Util template class
	const templates = new Templates(language)

	const { template: questionTemplateName } = await inquirer.prompt(
		templateQuestion(argv, templates)
	)

	// Template information
	const templateName = passedArgs.template ?? questionTemplateName
	const templatePath = templates.getTemplatePath(templateName)

	if (!templatePath) {
		throw new ErrorCLI('Não encontrei um template com esse nome')
	}

	const targetPath = path.join(process.cwd(), projectName)
	const shellAnswers = await inquirer.prompt(shellQuestions(argv))

	const options: CliOptions = {
		projectName,
		templateName,
		templatePath,
		targetPath,
		language,
		runInstall: passedArgs.install || shellAnswers.runInstall,
		runGitInit: passedArgs.git || shellAnswers.git,
	}

	createTargetDirectory(targetPath)

	// Sub questions per template
	if (options.templateName.toLowerCase() === 'next') {
		const { templateOptions } = await inquirer.prompt(nextTemplateQuestions)

		createDirectoryContents({
			name: projectName,
			targetPath,
			templatePath,
			templateOptionsParsed: parseTemplateOptions('next', templateOptions),
		})
	} else if (options.templateName.toLowerCase() === 'webapi') {
		const { templateOptions } = await inquirer.prompt(webapiTemplateQuestions)

		createDirectoryContents({
			name: projectName,
			templatePath,
			targetPath,
			templateOptionsParsed: parseTemplateOptions('webapi', templateOptions),
		})
	} else if (options.templateName.toLowerCase() === 'express') {
		const { templateOptions } = await inquirer.prompt(expressTemplateQuestions)

		createDirectoryContents({
			name: projectName,
			templatePath,
			targetPath,
			templateOptionsParsed: parseTemplateOptions('express', templateOptions),
		})
	} else {
		createDirectoryContents({
			name: projectName,
			targetPath,
			templatePath,
		})
	}

	// Post process
	postProcess(options)
}
