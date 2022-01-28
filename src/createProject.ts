import * as fs from 'fs'
import * as chalk from 'chalk'

export default function createProject(projectPath: string) {
	if (fs.existsSync(projectPath)) {
		console.log(
			chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
		)
		return false
	}

	fs.mkdirSync(projectPath)

	return true
}
