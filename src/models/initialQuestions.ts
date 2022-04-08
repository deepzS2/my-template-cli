import * as inquirer from 'inquirer'
import { ArgumentsType } from '../@types/global'

interface Answers {
	name: string
	language: 'C#' | 'JavaScript' | 'TypeScript'
}

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

const questions = (
	argv: ArgumentsType
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
		choices: ['C#', 'JavaScript', 'TypeScript'],
		when: () => argv.language === undefined,
	},
]

export default questions
