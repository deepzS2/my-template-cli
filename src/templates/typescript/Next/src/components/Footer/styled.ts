import styled from 'styled-components'

export const Container = styled.footer`
	display: flex;
	flex: 1;
	padding: 2rem 0;
	border-top: 1px solid ${({ theme }) => theme.colors.secondary};
	justify-content: center;
	align-items: center;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
`

export const Logo = styled.span`
	height: 1em;
	margin-left: 0.5rem;
`
