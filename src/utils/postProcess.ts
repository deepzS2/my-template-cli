import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

import { CliOptions } from '../@types/global'

export default function postProcess(options: CliOptions) {
	const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'))

	if (!isNode) return

	shell.cd(options.targetPath)

	try {
		if (isNode && options.runInstall)
			execute('yarn install', 'Você não tem yarn instalado!')

		if (options.runGitInit) execute('git init', 'Você não tem git instalado!')
	} catch (error) {
		console.error((error as Error)?.message)
		return process.exit(1)
	}

	console.log(
		`Projeto ${
			options.projectName
		} criado! Utilize os seguintes comandos para começar:\n\n${chalk.italic.gray(
			`cd ${options.projectName}`
		)}\n${chalk.italic.gray(`yarn dev`)}`
	)

	return true
}

function execute(command: string, errorMsg: string) {
	const result = shell.exec(command)

	if (result.code !== 0)
		throw new Error(chalk.red.bold('ERROR') + ' ' + chalk.bold(errorMsg))
}
