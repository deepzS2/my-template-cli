import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import ThemeContext from './theme'
import 'react-toastify/dist/ReactToastify.css'

const ContextsProviders: React.FC<PropsWithChildren<unknown>> = ({
	children,
}) => {
	return (
		<>
			<ToastContainer />
			<ThemeContext>{children}</ThemeContext>
		</>
	)
}

export default ContextsProviders
