import { QueryClient, QueryClientProvider as Provider } from 'react-query'

export const queryClient = new QueryClient()

export const QueryClientProvider: React.FC = ({ children }) => (
	<Provider client={queryClient}>{children}</Provider>
)
