import express from 'express'

import UsersController from '@controllers/UsersController'

const router = express.Router()

router.get('/users', UsersController.index)
router.post('/users', UsersController.create)

export default router
