import { NextFunction, Request, Response } from 'express'

import logger from '@utils/logger'

/**
 * If the user is not authenticated, return a 401 error. Otherwise, continue to the next
 * middleware
 * @param [required=false] - boolean - if true, the user must be authenticated. If false, the
 * user can be authenticated or not.
 * @returns A function that takes in a request, response, and next function.
 */
export function isAuthenticated(required = false) {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.session.user && required) {
			return res.status(401).send({
				error: 'UNAUTHORIZED',
			})
		}

		logger.debug(req.session.user, 'User session')
		return next()
	}
}
