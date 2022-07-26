import { Optional } from 'sequelize'

// User
export interface UserAttributes {
	id: number
	name: string
	username: string
	email: string
	password: string
}
export type UserInput = Optional<UserAttributes, 'id' | 'username'>
export type UserOutput = Required<UserAttributes>
