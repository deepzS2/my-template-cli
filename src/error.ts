import * as chalk from 'chalk'

export default class ErrorCLI extends Error {
	constructor(message: string) {
		super(message)

		console.log(`${chalk.bold.red('ERROR')} ${message}`)

		process.exit(1)
	}
}
