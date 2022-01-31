import type { AppProps } from 'next/app'

import ContextsProviders from '@contexts/index'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ContextsProviders>
			<Component {...pageProps} />
		</ContextsProviders>
	)
}

export default MyApp
