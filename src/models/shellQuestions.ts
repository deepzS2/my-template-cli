import * as inquirer from 'inquirer'

import { getArgument } from '../args'

interface Answers {
	git: boolean
	runInstall: boolean
}

const questions: inquirer.QuestionCollection<Answers> = [
	{
		name: 'git',
		type: 'confirm',
		message: 'Gostaria de inicializar um repositório git?',
		default: false,
		when: () => getArgument<boolean>('git') === undefined,
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
		when: () => getArgument<boolean>('install') === undefined,
	},
]

export default questions
