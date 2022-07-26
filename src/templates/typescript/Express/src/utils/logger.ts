import path from 'path'
import pino from 'pino'

import { isProd } from '@/config'

const logFileDestination = path.join(
	__dirname,
	'..',
	'..',
	'logs',
	`default.log`
)

const transport = pino.transport({
	targets: [
		{
			level: isProd ? 'info' : 'trace',
			target: 'pino-pretty',
			options: {
				colorize: true,
				levelFirst: true,
				translateTime: 'dd-mm-yyyy, h:MM:ss TT',
				ignore: 'pid,hostname',
			},
		},
		{
			level: isProd ? 'info' : 'trace',
			target: 'pino/file',
			options: {
				destination: logFileDestination,
				append: false,
				mkdir: true,
			},
		},
	],
})

export default pino(transport)
