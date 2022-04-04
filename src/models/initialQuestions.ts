import * as inquirer from 'inquirer'

import { getArgument, getArgumentIndex } from '../args'

interface Answers {
	name: string
	ts: boolean
}

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

const questions: inquirer.QuestionCollection<Answers> = [
	{
		name: 'name',
		type: 'input',
		message: 'Nome do projeto:',
		when: () => !getArgumentIndex(0),
		validate: (input) => REGEX_NAME.test(input),
	},
	{
		name: 'ts',
		type: 'confirm',
		message: 'Gostaria de utilizar TypeScript?',
		default: true,
		when: () => getArgument<boolean>('typescript') === undefined,
	},
]

export default questions
