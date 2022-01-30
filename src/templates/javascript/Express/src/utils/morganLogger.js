const chalk = require('chalk')
const Logger = require('./logger')

const getStatusColor = (status) =>
	status >= 500
		? chalk.red
		: status >= 400
		? chalk.yellow
		: status >= 300
		? chalk.cyan
		: status >= 200
		? chalk.green
		: chalk.italic

const logger = new Logger('[HH:mm:ss] type message')

module.exports = function (tokens, req, res) {
	const status = tokens.status(req, res)
	const statusColor = getStatusColor(status)

	const content = [
		tokens.url(req, res),
		statusColor(status),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
	].join(' ')

	return logger.log(chalk.bold(tokens.method(req, res)), content)
}
