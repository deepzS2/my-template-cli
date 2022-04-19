import * as inquirer from 'inquirer'

import { ScriptArguments } from '../@types/global'

import Templates from '../utils/templates'

interface Answers {
	template: string
}

const question = (
	argv: ScriptArguments,
	templates: Templates
): inquirer.QuestionCollection<Answers> => {
	const argument = argv.template
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
