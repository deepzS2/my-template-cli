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

const Button: React.FC<Props> = ({
	children,
	inverted,
	pointer,
	fontSize,
	fontWeight,
	bgColor,
	padding,
	textColor,
	onClick,
}) => {
	return (
		<Container
			onClick={onClick}
			customPadding={padding}
			textColor={textColor}
			bgColor={bgColor}
			inverted={inverted}
			pointer={pointer}
			customFontSize={fontSize}
			customFontWeight={fontWeight}
		>
			{children}
		</Container>
	)
}

export default Button
