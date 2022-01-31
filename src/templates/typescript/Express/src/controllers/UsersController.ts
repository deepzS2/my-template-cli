import { User } from '@database/models'

export default {
	index: async (req, res) => {
		const users = await User.findAll()
		res.send(users)
	},
	create: async (req, res) => {
		const user = await User.create(req.body)
		res.send(user)
	},
}
