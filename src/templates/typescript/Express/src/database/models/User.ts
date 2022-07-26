import { DataTypes, Model, Sequelize } from 'sequelize'

import { UserAttributes, UserInput } from '@/@types'

export class UserModel
	extends Model<UserAttributes, UserInput>
	implements UserAttributes
{
	declare id: number
	declare name: string
	declare username: string
	declare email: string
	declare password: string

	declare readonly createdAt: Date
	declare readonly updatedAt: Date
}

export default function (sequelize: Sequelize): typeof UserModel {
	return UserModel.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			username: {
				type: new DataTypes.STRING(128),
				allowNull: true,
			},
			email: {
				type: new DataTypes.STRING(128),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			sequelize,
			timestamps: true,
			paranoid: true,
		}
	)
}
