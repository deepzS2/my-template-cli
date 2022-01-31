import { NextPage } from 'next'

import api from '@services/api'

interface Post {
	id: number
	title: string
	body: string
	userId: number
}

interface Props {
	error?: Error
	posts?: Post[]
}

const Posts: NextPage<Props> = ({ posts, error }) => {
	if (error) {
		return <div>An error occured: {error.message}</div>
	}

	return (
		<ul>
			{posts?.map((post) => (
				<li key={post.id}>
					<h1>{post.title}</h1>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	)
}

Posts.getInitialProps = async () => {
	try {
		const { data: posts } = await api.get('/posts')

		return { posts }
	} catch (error) {
		return { error: error as Error }
	}
}

export default Posts
