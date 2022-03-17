import styled from 'styled-components'

export const Container = styled.div`
	padding: 0 2rem;
`

export const Main = styled.main`
	min-height: 100vh;
	padding: 4rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const Title = styled.h1`
	margin: 0;
	line-height: 1.15;
	font-size: 4rem;
	text-align: center;

	span {
		font-size: 2rem;
	}

	a {
		color: ${({ theme }) => theme.colors.main};
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			text-decoration: underline;
		}
	}
`

export const Description = styled.p`
	text-align: center;
	margin: 4rem 0;
	line-height: 1.5;
	font-size: 1.5rem;

	code {
		background: ${({ theme }) => theme.colors.tertiary};
		border-radius: 5px;
		padding: 0.75rem;
		font-size: 1.1rem;
		font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
			DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
	}
`

export const ButtonsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
	margin-bottom: 1rem;

	button {
		flex: 1 0 40%;
		max-width: 40%;
	}
`

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.buttons {
		display: flex;
		gap: 1rem;
		width: 100%;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: center;
	}
`
