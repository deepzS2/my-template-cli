import path from 'path'
import { Sequelize } from 'sequelize'

import { isProd } from '@/config'

import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USERNAME,
} from '../config'

export default new Sequelize(
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	{
		dialect: isProd ? 'mysql' : 'sqlite',
		storage: path.join(__dirname, '..', '..', 'data', 'dev.sqlite'),
		port: parseInt(DATABASE_PORT),
		host: DATABASE_HOST,
		logging: false,
	}
)
