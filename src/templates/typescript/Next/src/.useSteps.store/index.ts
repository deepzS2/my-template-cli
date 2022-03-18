import { createStore } from 'little-state-machine'
import { MiddleWare } from 'little-state-machine/dist/types'

const log: MiddleWare = (store) => {
	console.log(store)
	return store
}

createStore(
	{
		loginForm: {
			username: '',
			password: '',
		},
	},
	{
		name: 'steps',
		middleWares: [log],
	}
)
