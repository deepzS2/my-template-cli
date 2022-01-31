import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '@styles/GlobalStyles'
import theme from '@styles/theme'

const ThemeContext: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}

export default ThemeContext
