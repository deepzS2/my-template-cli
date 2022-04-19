import * as inquirer from 'inquirer'

interface Answers {
	templateOptions: string[]
}

export const keys = ['useArrowFunction']

const question: inquirer.QuestionCollection<Answers> = {
	name: 'templateOptions',
	type: 'checkbox',
	message: 'Perguntas adicionais:',
	choices: [
		{
			name: 'Utilizar arrow function?',
			value: keys[0],
		},
	],
}

export default question
