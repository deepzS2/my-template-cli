import React, { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Container } from './styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	invalid?: boolean
	invalidMessage?: string
}

const Input: React.ForwardRefRenderFunction<
	HTMLInputElement,
	Props & Partial<UseFormRegisterReturn>
> = ({ invalidMessage, invalid, ...props }, ref) => {
	return (
		<Container className="input-wrapper" invalid={invalid}>
			{props.label && <label>{props.label}</label>}
			{<input ref={ref} {...props} />}
			{invalid && invalidMessage && (
				<span className="input__error">{invalidMessage}</span>
			)}
		</Container>
	)
}

export default forwardRef(Input)
