import * as inquirer from 'inquirer'
import { Args, IQuestions } from './@types/global'

const REGEX_NAME = /^([A-Za-z\-_\d])+$/gm

/**
 * Create a choice question (list)
 * @param name Name (check IQuestions on global.d.ts)
 * @param message Message to display
 * @param choices The choices to display for the user
 * @param when Function to handle when it should be displayed
 */
export const createChoiceQuestion = <T, K extends string>(
	name: K,
	message: string,
	choices: T[],
	when?: () => boolean
): inquirer.QuestionCollection<Record<K, T>> => [
	{
		name,
		type: 'list',
		message,
		choices,
		when,
	},
]

export const firstQuestions = (
	args: Args
): inquirer.QuestionCollection<Pick<IQuestions, 'name' | 'ts'>> => [
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

export const lastQuestions = (
	args: Args
): inquirer.QuestionCollection<Pick<IQuestions, 'git' | 'runInstall'>> => [
	{
		name: 'git',
		type: 'confirm',
		message: 'Gostaria de inicializar um repositório git?',
		default: false,
		when: () => args['git'] === undefined,
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
		when: () => args['install'] === undefined,
	},
]
