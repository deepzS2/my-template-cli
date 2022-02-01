import { ThemeProvider } from 'styled-components'

import GlobalStyles from '@styles/GlobalStyles'
import theme from '@styles/theme'

const ThemeContext = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}

export default ThemeContext