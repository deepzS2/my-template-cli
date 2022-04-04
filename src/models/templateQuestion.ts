import * as inquirer from 'inquirer'

import { getArgument } from '../args'
import Templates from '../utils/templates'

interface Answers {
	template: string
}

const question = (
	templates: Templates
): inquirer.QuestionCollection<Answers> => {
	const argument = getArgument<string>('template')
	const templatesAvailable = templates.getAllTemplatesFromPath()

	return {
		name: 'template',
		type: 'list',
		message: 'Qual template você gostaria de utilizar?',
		choices: templatesAvailable.map((choice) => choice.name),
		when: () => !argument && argument !== '',
	}
}

export default question
