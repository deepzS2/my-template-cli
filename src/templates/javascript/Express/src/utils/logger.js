const chalk = require('chalk')

/**
 * Replace HH, mm and ss by the respective values
 * @param {string} format Format string
 * @returns {string} New format replaced
 */
const getTimeString = (format) => {
	const date = new Date()
	let newFormat = format

	const toString = (number) => {
		if (number < 10) return '0' + number.toString()
		else return number.toString()
	}

	const matches = format.match(/[^\w]?(HH|mm|ss)([^\w]|$)/gm)

	matches.forEach((match) => {
		const formatMatch = (content, letter) =>
			(match.charAt(0) === letter ? '' : match.charAt(0)) +
			content +
			match.charAt(match.length - 1)

		const hours = toString(date.getHours())
		const minutes = toString(date.getMinutes())
		const seconds = toString(date.getSeconds())

		if (match.includes('HH'))
			newFormat = newFormat.replace(match, formatMatch(hours, 'H'))
		else if (match.includes('mm'))
			newFormat = newFormat.replace(match, formatMatch(minutes, 'm'))
		else if (match.includes('ss'))
			newFormat = newFormat.replace(match, formatMatch(seconds, 's'))
	})

	return newFormat
}

/**
 * Replace () | [] inside content by a chalk font format
 * Note: [] will not be deleted, only () and {}
 * @param {string} format Format string
 * @param {number} position Position to use with recursive function
 * @returns {string} New format replaced
 */
const replaceFormatString = (format) => {
	const matches = format.match(/(\(|\[)[\w\W]+?(\)|\])/gm)

	let newFormat = format

	matches.forEach((match) => {
		const specialCharacters = match.charAt(0) + match.charAt(match.length - 1)

		if (specialCharacters === '[]') {
			newFormat = newFormat.replace(match, chalk.bold(match))
		} else if (specialCharacters === '()')
			newFormat = newFormat.replace(match, chalk.italic(match.slice(1, -1)))
	})

	return newFormat
}

/**
 * Create logger with options
 * @param {string} format Format string, example: [HH:mm:ss] type message
 * @param {{ time: boolean }} options Other options
 */
function Logger(format, options) {
	if (format) this.format = replaceFormatString(format)
	if (options && options.time) this.time = options.time
}

/**
 * Format string
 */
Logger.prototype.format = Logger.format = replaceFormatString(
	'[HH:mm:ss] type (message)'
)

/**
 * Use time on log (HH for hours, mm for minutes, ss for seconds)
 */
Logger.prototype.time = Logger.time = true

/**
 * Log using the format provided and options
 * @param {string} type Type used on the format string or any custom provided
 * @param {string[] | Object[]} content Content to display
 */
Logger.log = Logger.prototype.log = function (type, ...content) {
	let finalLog = this.format || Logger.format
	const useTime = this.time === undefined ? Logger.time : this.time

	if (!useTime) finalLog = finalLog.replace(/[^\w]?(HH|mm|ss)([^\w]|$)/gm, '')
	else finalLog = getTimeString(finalLog)

	if (typeof content[0] !== 'string') {
		finalLog = finalLog.replace('type', type).replace('message', '%O')

		return console.log(finalLog, content[0])
	} else {
		finalLog = finalLog
			.replace('type', type)
			.replace('message', content.join(' '))

		return console.log(finalLog)
	}
}

Logger.info = Logger.prototype.info = function (...message) {
	return (this.log || Logger.log)(chalk.blue('INFO'), ...message)
}

Logger.debug = Logger.prototype.debug = function (...message) {
	return (this.log || Logger.log)(chalk.cyan('DEBUG'), ...message)
}

Logger.warning = Logger.prototype.warning = function (...message) {
	return (this.log || Logger.warning)(chalk.yellow('WARNING'), ...message)
}

Logger.error = Logger.prototype.error = function (...message) {
	return (this.log || Logger.error)(chalk.red('ERROR'), ...message)
}

Logger.object = Logger.prototype.object = function (object) {
	return (this.log || Logger.object)(chalk.gray('OBJECT'), object)
}

module.exports = Logger
