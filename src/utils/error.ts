import chalk from 'chalk'

export default class ErrorCLI extends Error {
	constructor(message: string) {
		super(message)

		console.log(`${chalk.bold.red('ERROR')} ${message}`)

		process.env.NODE_ENV !== 'test' && process.exit(1)
	}
}
