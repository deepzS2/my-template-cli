import * as inquirer from 'inquirer'

import { Args } from '../@types/global'
import { getArgument } from '../args'

interface Answers {
	git: boolean
	runInstall: boolean
}

const questions = (args: Args): inquirer.QuestionCollection<Answers> => [
	{
		name: 'git',
		type: 'confirm',
		message: 'Gostaria de inicializar um repositório git?',
		default: false,
		when: () => getArgument({ type: 'boolean', key: 'git' }),
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
		when: () => getArgument({ key: 'install', type: 'boolean' }),
	},
]

export default questions
