import React from 'react'

import { Container } from './styles'

interface Props {
	inverted?: boolean
	pointer?: boolean
	padding?: string
	bgColor?: string
	fontSize?: string
	fontWeight?: string
	textColor?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<
	Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
	return <Container {...props}>{children}</Container>
}

export default Button
