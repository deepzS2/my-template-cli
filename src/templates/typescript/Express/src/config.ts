import 'dotenv/config'

export const isDev = process.env.NODE_ENV === 'dev'
export const isProd = process.env.NODE_ENV === 'prod'

// Express
export const PORT = process.env.PORT

// Session
export const SESSION_SECRET = process.env.SESSION_SECRET
export const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE

// Database
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_PORT = process.env.DATABASE_PORT
