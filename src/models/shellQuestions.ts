import * as inquirer from 'inquirer'
import { ArgumentsType } from '../@types/global'

interface Answers {
	git: boolean
	runInstall: boolean
}

const questions = (
	argv: ArgumentsType
): inquirer.QuestionCollection<Answers> => [
	{
		name: 'git',
		type: 'confirm',
		message: 'Gostaria de inicializar um repositório git?',
		default: false,
		when: () => argv.git === undefined,
	},
	{
		name: 'runInstall',
		type: 'confirm',
		message: 'Gostaria de instalar as dependências automaticamente',
		default: true,
		when: () => argv.install === undefined,
	},
]

export default questions
