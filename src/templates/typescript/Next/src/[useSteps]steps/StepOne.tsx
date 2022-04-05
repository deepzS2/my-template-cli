import { useForm } from 'react-hook-form'
import { LoginForm, useFormStore } from 'store/steps'

import Button from '@components/Button'
import Input from '@components/Input'

import StepProps from './props'
import { Container } from './styles'

const StepOne = ({ nextStep }: StepProps) => {
	const { actions } = useFormStore()
	const { formState, register, handleSubmit } = useForm<LoginForm>()

	const onSubmit = (data: LoginForm) => {
		actions.updateFormStore({
			...data,
		})

		nextStep && nextStep()
	}

	return (
		<Container onSubmit={handleSubmit(onSubmit)}>
			<h3>Autenticação</h3>
			<Input
				type="text"
				placeholder="Cleber"
				label="Nome de usuario..."
				invalid={!!formState.errors.username}
				invalidMessage={formState.errors.username?.message}
				{...register('username', { required: true })}
			/>
			<Button type="submit">Próximo</Button>
		</Container>
	)
}

export default StepOne
