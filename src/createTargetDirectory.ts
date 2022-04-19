import chalk from 'chalk'

import fs from 'fs'

import ErrorCLI from '@utils/error'

/**
 * Create the project/component/other directory
 * @param path CWD + target
 */
export default function createTargetDirectory(path: string) {
	if (fs.existsSync(path)) {
		throw new ErrorCLI(
			`A pasta ${chalk.bold.yellow(
				path
			)} já existe. Delete-a ou use outro nome para o projeto.`
		)
	}

	fs.mkdirSync(path)
}
