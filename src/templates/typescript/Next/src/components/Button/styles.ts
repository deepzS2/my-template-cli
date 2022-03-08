import styled from 'styled-components'

interface ContainerProps {
	inverted?: boolean
	pointer?: boolean
	bgColor?: string
	textColor?: string
	customPadding?: string
	customFontSize?: string
	customFontWeight?: string
}

export const Container = styled.button<ContainerProps>`
	background-color: ${({ theme, inverted, bgColor }) =>
		inverted ? 'transparent' : bgColor || theme.colors.main};
	color: ${({ theme, inverted, textColor }) =>
		inverted ? theme.colors.main : textColor || theme.colors.secondary};
	border: ${({ theme, inverted }) =>
		inverted ? `1px solid ${theme.colors.main}` : 'none'};
	cursor: ${({ pointer }) => (pointer ? 'pointer' : 'normal')};
	border-radius: 10px;
	padding: ${({ customPadding }) => customPadding || '1rem 3rem'};
	font-weight: ${({ customFontWeight }) => customFontWeight || '600'};
	font-size: ${({ customFontSize }) => customFontSize || '16px'};

	display: flex;
	align-items: center;
`
