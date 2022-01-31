import Image from 'next/image'
import React from 'react'

import { Container, Logo } from './styled'

const Footer: React.FC = () => (
	<Container>
		<a
			href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
			target="_blank"
			rel="noopener noreferrer"
		>
			Powered by{' '}
			<Logo>
				<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
			</Logo>
		</a>
	</Container>
)

export default Footer
