import * as inquirer from 'inquirer'

interface Answers {
	templateOptions: string[]
}

export const keys = ['useSession']

const question: inquirer.QuestionCollection<Answers> = {
	name: 'templateOptions',
	type: 'checkbox',
	message: 'Gostaria de utilizar alguma biblioteca opcional?',
	choices: [
		{
			name: 'Express session (para sessões)',
			value: keys[0],
		},
	],
}

export default question
