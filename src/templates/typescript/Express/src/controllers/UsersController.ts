import { Request, Response } from 'express'

import Controller from '@/core/controller.decorator'
import { Get, Post } from '@/core/handlers.decorator'
import { isAuthenticated } from '@/middlewares/authentication.middleware'
import { User } from '@database/models'

@Controller('/users')
export default class UserController {
	@Get('/', isAuthenticated(true))
	public async index(req: Request, res: Response) {
		const users = await User.findAll()
		res.send(users)
	}

	@Post()
	public async create(req: Request, res: Response) {
		const user = await User.create(req.body)
		res.send(user)
	}

	@Post('/login')
	public async login(req: Request, res: Response) {
		const userExists = await User.findOne({
			where: {
				email: req.body.email,
			},
		})

		if (!userExists || userExists?.password !== req.body.password)
			return res.status(404).send({
				error: 'Email or password invalid',
			})

    <% if (useSession) { %>
		req.session.user = userExists
    <% } %>

		return res.send({
			message: 'Authenticated!',
		})
	}
}
