import api from '@services/api'

const Posts = ({ posts, error }) => {
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
		return { error: error }
	}
}

export default Posts
