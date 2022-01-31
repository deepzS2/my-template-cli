import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_PORT = process.env.DATABASE_PORT
export const NODE_ENV = process.env.NODE_ENV
