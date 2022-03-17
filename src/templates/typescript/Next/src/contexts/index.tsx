import { StateMachineProvider } from 'little-state-machine'
import { ToastContainer } from 'react-toastify'

import { QueryClientProvider } from './query'
import ThemeContext from './theme'

import '@/store'
import 'react-toastify/dist/ReactToastify.css'

const ContextsProviders: React.FC = ({ children }) => {
	return (
		<>
			<ToastContainer />
			<QueryClientProvider>
				<StateMachineProvider>
					<ThemeContext>{children}</ThemeContext>
				</StateMachineProvider>
			</QueryClientProvider>
		</>
	)
}

export default ContextsProviders
