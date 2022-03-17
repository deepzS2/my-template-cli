import * as inquirer from 'inquirer'
import { Args } from '../@types/global'

interface Answers {
	name: string
	ts: boolean
}

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

const questions = (args: Args): inquirer.QuestionCollection<Answers> => [
	{
		name: 'name',
		type: 'input',
		message: 'Nome do projeto:',
		when: () => args['_'].length === 0,
		validate: (input) => REGEX_NAME.test(input),
	},
	{
		name: 'ts',
		type: 'confirm',
		message: 'Gostaria de utilizar TypeScript?',
		default: true,
		when: () => args['ts'] === undefined,
	},
]

export default questions
