import inquirer from 'inquirer'
import yargs from 'yargs'

import path from 'path'

import { GenerateScriptArguments } from '@/@types/global'
import createDirectoryContents from '@/createDirectoryContents'
import createTargetDirectory from '@/createTargetDirectory'
import { generateQuestions } from '@models/index'
import componentStyledQuestions from '@models/templates/components/componentStyledQuestions'
import ErrorCLI from '@utils/error'
import parseTemplateOptions from '@utils/parseTemplateOptions'
import Templates from '@utils/templates'

export default async function (
	args: yargs.ArgumentsCamelCase<GenerateScriptArguments>
) {
	const { language: languageAnswer } = await inquirer.prompt(
		generateQuestions.first(args)
	)

	const language = languageAnswer ?? args.language

	const templates = new Templates('components/' + language.toLowerCase())
	const options = templates.getAllTemplatesFromPath()

	const {
		name: componentName,
		directory,
		targetName: targetNameAnswer,
	} = await inquirer.prompt(generateQuestions.last(args, options))

	const targetName = targetNameAnswer ?? args.name
	const templatePath = templates.getTemplatePath(componentName.toLowerCase())

	if (!templatePath) {
		throw new ErrorCLI(
			'Não encontrei um componente com esse nome em ' + language
		)
	}

	const { templateOptions } = await inquirer.prompt(componentStyledQuestions)
	const templateOptionsParsed = parseTemplateOptions(
		'componentStyled',
		templateOptions
	)

	const targetPath = directory
		? path.join(directory, targetName)
		: componentName

	createTargetDirectory(targetPath)
	createDirectoryContents({
		name: targetName,
		targetPath,
		templatePath,
		templateOptionsParsed,
	})
}
