import { useForm } from 'react-hook-form'

import { LoginForm, useFormStore } from '@/store/steps'
import Button from '@components/Button'
import Input from '@components/Input'

import { Container } from './styles'

const StepTwo: React.FC = () => {
	const { actions, state } = useFormStore()
	const { formState, register, handleSubmit } = useForm<LoginForm>()

	const onSubmit = (data: LoginForm) => {
		actions.updateFormStore({
			...data,
		})

		alert(
			`Usuário: ${state.loginForm.username}\nSenha: ${state.loginForm.password}`
		)
	}

	return (
		<Container onSubmit={handleSubmit(onSubmit)}>
			<h3>Autenticação</h3>
			<Input
				type="password"
				placeholder="senha"
				label="Senha"
				invalid={!!formState.errors.password}
				invalidMessage={formState.errors.password?.message}
				{...register('password', { required: true })}
			/>
			<Button>Login</Button>
		</Container>
	)
}

export default StepTwo
