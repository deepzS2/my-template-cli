import path from 'path'
import { Sequelize } from 'sequelize'

import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USERNAME,
	NODE_ENV,
} from '../config'

export default new Sequelize(
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	{
		dialect: NODE_ENV === 'production' ? 'mysql' : 'sqlite',
		storage: path.join(__dirname, '..', '..', 'dev.sqlite'),
		port: parseInt(DATABASE_PORT),
		host: DATABASE_HOST,
	}
)
