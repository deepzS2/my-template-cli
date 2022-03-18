import styled from 'styled-components'

export const Container = styled.form`
	border: 1px solid ${({ theme }) => theme.colors.main};
	width: 50%;
	box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.3);
	min-height: 50vh;

	margin: 0 auto;

	display: flex;
	align-items: center;

	flex-direction: column;
	gap: 1rem;

	padding: 1.5rem;

	.input-wrapper {
		width: 100%;
	}

	button {
		margin-top: auto;
		align-self: flex-end;
	}
`
