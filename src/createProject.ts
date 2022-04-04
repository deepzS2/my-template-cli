import fs from 'fs'
import chalk from 'chalk'

export default function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(
			chalk.bold.red(
				`A pasta ${chalk.bold.yellow(
					projectPath
				)} já existe. Delete-a ou use outro nome para o projeto.`
			)
		)
		return false
	}

	fs.mkdirSync(projectPath)

	return true
}
