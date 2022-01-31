import database from '@database/index'

import CreateUserModel from './User'

export const User = CreateUserModel(database)
export const initializeDatabase = () => Promise.all([User.sync()])
