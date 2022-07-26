import { RequestHandler } from 'express'

import { IRouter } from '@/@types'

import { MetadataKeys } from './metadata.keys'

export enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

const methodDecoratorFactory = (method: Methods) => {
	return (path = '/', ...middlewares: RequestHandler[]): MethodDecorator => {
		return (target, propertyKey) => {
			const controllerClass = target.constructor

			const routers: IRouter[] = Reflect.hasMetadata(
				MetadataKeys.ROUTERS,
				controllerClass
			)
				? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
				: []

			routers.push({
				method,
				path,
				handlerName: propertyKey,
				middlewares,
			})

			Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
		}
	}
}

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Put = methodDecoratorFactory(Methods.PUT)
export const Delete = methodDecoratorFactory(Methods.DELETE)
