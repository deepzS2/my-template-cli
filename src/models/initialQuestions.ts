import * as inquirer from 'inquirer'

import { ScriptArguments } from '../@types/global'

interface Answers {
	name: string
	language: 'C#' | 'TypeScript'
}

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

const questions = (
	argv: ScriptArguments
): inquirer.QuestionCollection<Answers> => [
	{
		name: 'name',
		type: 'input',
		message: 'Nome do projeto:',
		when: () => argv.projectName === undefined,
		validate: (input) => REGEX_NAME.test(input),
	},
	{
		name: 'language',
		type: 'list',
		message: 'Gostaria de utilizar qual linguagem?',
		choices: ['C#', 'TypeScript'],
		when: () => argv.language === undefined,
	},
]

export default questions
