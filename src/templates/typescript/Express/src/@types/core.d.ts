import { RequestHandler } from 'express'

export interface IRouter {
	method: Methods
	path: string
	handlerName: string | symbol
	middlewares?: RequestHandler[]
}
