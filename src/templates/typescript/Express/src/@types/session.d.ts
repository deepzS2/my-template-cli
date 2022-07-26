import { UserAttributes } from './models'

declare module 'express-session' {
	interface SessionData {
		user: UserAttributes
	}
}

export {}
