import { GlobalState, useStateMachine } from 'little-state-machine'

export interface LoginForm {
	username?: string
	password?: string
}

const updateFormStore = (
	state: GlobalState,
	payload: LoginForm
): GlobalState => {
	return {
		...state,
		loginForm: {
			...state.loginForm,
			...payload,
		},
	}
}

export const useFormStore = () => {
	return useStateMachine({ updateFormStore })
}
