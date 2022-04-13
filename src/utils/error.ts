import chalk from 'chalk'

/**
 * Error utility class
 */
export default class ErrorCLI extends Error {
	/**
	 * Throw error and exit
	 * @param message Message to display
	 */
	constructor(message: string) {
		super(message)

		console.log(`${chalk.bold.red('ERROR')} ${message}`)

		process.env.NODE_ENV !== 'test' && process.exit(1)
	}
}
