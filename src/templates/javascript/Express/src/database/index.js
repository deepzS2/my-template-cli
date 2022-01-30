const {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USERNAME,
	NODE_ENV,
} = require('../config')
const path = require('path')

module.exports = {
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	storage: path.join(__dirname, '..', '..', 'dev.sqlite'),
	dialect: NODE_ENV === 'production' ? 'mysql' : 'sqlite',
}
