import * as fs from 'fs'
import * as chalk from 'chalk'

export default function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(
			chalk.red.bold(
				`A pasta ${projectPath} já existe. Delete-a ou use outro nome para o projeto.`
			)
		)
		return false
	}

	fs.mkdirSync(projectPath)

	return true
}
