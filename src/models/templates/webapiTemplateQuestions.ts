import * as inquirer from 'inquirer'

interface Answers {
	templateOptions: string[]
}

export const keys = ['useDocker']

const question: inquirer.QuestionCollection<Answers> = {
	name: 'templateOptions',
	type: 'checkbox',
	message: 'Gostaria de utilizar alguma biblioteca/ferramenta opcional?',
	choices: [
		{
			name: 'Docker',
			value: keys[0],
		},
	],
}

export default question
