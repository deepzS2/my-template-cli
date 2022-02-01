import ThemeContext from './theme'

const ContextsProviders = ({
	children,
}) => {
	return <ThemeContext>{children}</ThemeContext>
}

export default ContextsProviders