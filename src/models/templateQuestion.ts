import * as inquirer from 'inquirer'

import { Args } from '../@types/global'
import { getArgument } from '../args'
import Templates from '../utils/templates'

interface Answers {
	template: string
}

const question = (
	args: Args,
	templates: Templates
): inquirer.QuestionCollection<Answers> => {
	const templatesAvailable = templates.getAllTemplatesFromPath()

	return {
		name: 'template',
		type: 'list',
		message: 'Qual template você gostaria de utilizar?',
		choices: templatesAvailable.map((choice) => choice.name),
		when: () => !!getArgument({ key: 'template', type: 'string' }),
	}
}

export default question
