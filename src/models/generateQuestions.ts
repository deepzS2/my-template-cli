import * as inquirer from 'inquirer'

import fs from 'fs'
import path from 'path'

import { GenerateScriptArguments, ITemplate } from '../@types/global'

const SKIP_DIRECTORIES = ['node_modules', '.git']

interface InitialAnswer {
	language: 'C#' | 'TypeScript'
}

interface RemainingAnswers {
	name: string
	targetName: string
	directory?: string
}

const REGEX_NO_SPACE = /^([A-Za-z\-_\d])+$/gm

const initialQuestions = (
	argv: GenerateScriptArguments
): inquirer.QuestionCollection<InitialAnswer> => [
	{
		name: 'language',
		type: 'list',
		message: 'Gostaria de utilizar qual linguagem?',
		choices: ['C#', 'TypeScript'],
		when: () => argv.language === undefined,
	},
]

const remainingQuestions = (
	argv: GenerateScriptArguments,
	options: ITemplate[]
): inquirer.QuestionCollection<RemainingAnswers> => {
	const files = ['.', ...fs.readdirSync(process.cwd())]
	const directories = files.filter((value) => {
		const stats = fs.statSync(path.join(process.cwd(), value))

		return stats.isDirectory() && !SKIP_DIRECTORIES.includes(value)
	})

	return [
		{
			name: 'name',
			type: 'list',
			message: 'Componente que será gerado:',
			choices: options,
		},
		{
			name: 'targetName',
			type: 'input',
			message: 'Nome do componente:',
			validate: (input) => REGEX_NO_SPACE.test(input),
			when: () => argv.name === undefined,
		},
		{
			name: 'directory',
			type: 'list',
			message: 'Diretório de destino:',
			choices: directories,
		},
	]
}

export default {
	first: initialQuestions,
	last: remainingQuestions,
}
