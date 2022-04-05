import fs from 'fs'
import chalk from 'chalk'
import ErrorCLI from './utils/error'

/**
 * Create the project directory
 * @param projectPath CWD
 */
export default function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		throw new ErrorCLI(
			`A pasta ${chalk.bold.yellow(
				projectPath
			)} já existe. Delete-a ou use outro nome para o projeto.`
		)
	}

	fs.mkdirSync(projectPath)
}
