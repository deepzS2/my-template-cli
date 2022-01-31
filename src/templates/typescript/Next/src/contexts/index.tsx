import { PropsWithChildren } from 'react'

import ThemeContext from './theme'

const ContextsProviders: React.FC<PropsWithChildren<unknown>> = ({
	children,
}) => {
	return <ThemeContext>{children}</ThemeContext>
}

export default ContextsProviders
