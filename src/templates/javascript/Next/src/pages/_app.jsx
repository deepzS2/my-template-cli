import ContextsProviders from '@contexts/index'

function MyApp({ Component, pageProps }) {
	return (
		<ContextsProviders>
			<Component {...pageProps} />
		</ContextsProviders>
	)
}

export default MyApp
