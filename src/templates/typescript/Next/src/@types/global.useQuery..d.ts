import 'little-state-machine'

declare module 'little-state-machine' {
	interface GlobalState {
		loginForm: {
			username: string
			password: string
		}
	}
}
