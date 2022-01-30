require('dotenv').config()

module.exports = {
	PORT: process.env.PORT,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
	DATABASE_HOST: process.env.DATABASE_HOST,
	DATABASE_PORT: process.env.DATABASE_PORT,
	NODE_ENV: process.env.NODE_ENV,
}
