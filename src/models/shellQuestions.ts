import * as inquirer from 'inquirer'
import { Args } from '../@types/global'

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

export default questions
