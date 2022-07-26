import 'reflect-metadata'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express } from 'express'
import pino from 'express-pino-logger'
import session, { SessionOptions } from 'express-session'
import { readdirSync } from 'fs'
import createError from 'http-errors'
import { AddressInfo, Server } from 'net'
import path from 'path'

import error from '@utils/error'

import { ClassType } from './@types'
import { IRouter } from './@types/core'
import { COOKIE_MAX_AGE, isProd, PORT, SESSION_SECRET } from './config'
import { MetadataKeys } from './core/metadata.keys'
import { initializeDatabase } from './database/models'
import defaultImport from './utils/defaultImport'
import logger from './utils/logger'

export default class Application {
	private readonly CONTROLLERS_PATH = path.join(__dirname, 'controllers')
	private readonly _instance: Express
	private _server: Server

	get server() {
		return this._server
	}

	get instance() {
		return this._instance
	}

	constructor() {
		this._instance = express()
	}

	/**
	 * It starts the server and initializes the database
	 */
	public async start() {
		this._server = this._instance.listen(
			parseInt(PORT),
			'127.0.0.1',
			async () => {
				try {
					await initializeDatabase()
					logger.info(`Database models synchronized!`)

					const address = this._server.address() as AddressInfo
					logger.info(
						`🚀 Server is running on http://${address.address}:${address.port}`
					)
				} catch (error) {
					logger.error(
						`Something went wrong while trying to synchronize database models...`
					)
				}
			}
		)
	}

	/**
	 * We're setting up the middlewares for our Express app
	 */
	public async setup() {
		// JSON and URLENCODED
		this._instance.use(express.json())
		this._instance.use(express.urlencoded({ extended: false }))

		// Cookie, Logger and CORS
		this._instance.use(cors())
		this._instance.use(cookieParser())
		this._instance.use(
			pino({
				logger,
			})
		)

    <% if (useSession) { %>
		// Session
		const sessionOptions: SessionOptions = {
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: parseInt(COOKIE_MAX_AGE),
			},
		}

		if (isProd) {
			this._instance.set('trust proxy', 1)
			sessionOptions.cookie.secure = true
		}

		this._instance.use(session(sessionOptions))
    <% } %> 

		// Routes
		await this.registerControllers()

		// Catch 404 and forward to error handler
		this._instance.use(function (_req, _res, next) {
			next(createError(404))
		})

		// Error Handler
		this._instance.use(error)
	}

	/**
	 * It returns an array of all the files in the controllers directory
	 * @returns An array of all the files in the controllers directory.
	 */
	private getControllers() {
		return readdirSync(this.CONTROLLERS_PATH)
	}

	/**
	 * We're looping through all the controllers, creating an instance of each controller,
	 * getting the base path and routers from the controller instance, creating an express
	 * router, and then looping through the routers and adding them to the express router
	 */
	private async registerControllers() {
		const info: Array<{ api: string; handler: string }> = []

		await Promise.all(
			this.getControllers().map(async (file) => {
				const ControllerClass = await defaultImport<ClassType>(
					path.join(this.CONTROLLERS_PATH, file)
				)
				const controllerInstance = new ControllerClass()

				const basePath: string = Reflect.getMetadata(
					MetadataKeys.BASE_PATH,
					ControllerClass
				)
				const routers: IRouter[] = Reflect.getMetadata(
					MetadataKeys.ROUTERS,
					ControllerClass
				)

				const expressRouter = express.Router()

				routers?.forEach(({ method, path, handlerName, middlewares }) => {
					if (middlewares.length)
						expressRouter[method](
							path,
							...middlewares,
							controllerInstance[String(handlerName)].bind(controllerInstance)
						)
					else
						expressRouter[method](
							path,
							controllerInstance[String(handlerName)].bind(controllerInstance)
						)

					info.push({
						api: `${method.toLocaleUpperCase()} ${basePath + path}`,
						handler: `${ControllerClass.name}.${String(handlerName)}`,
					})
				})

				this._instance.use(basePath, expressRouter)

				logger.info(info, 'Routes registered successfully!')
			})
		)
	}
}
