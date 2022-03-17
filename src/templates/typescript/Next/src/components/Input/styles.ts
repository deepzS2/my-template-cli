import styled from 'styled-components'

interface ContainerProps {
	invalid?: boolean
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	label {
		font-weight: 500;
		font-size: 1.1em;
		color: #000;
	}

	input {
		padding: 0.8rem 1rem;
		border: 1px solid
			${({ invalid, theme }) => (invalid ? '#f00' : theme.colors.main)};
		border-radius: 5px;
		width: 100%;

		&::placeholder {
			color: darkgray;
			font-weight: 400;
		}
	}
`
