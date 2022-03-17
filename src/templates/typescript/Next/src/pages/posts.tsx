import { AxiosError } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useQuery } from 'react-query'

import api from '@services/api'

interface Post {
	id: number
	title: string
	body: string
	userId: number
}

interface Props {
	posts?: Post[]
}

const delay = (seconds: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, 1000 * seconds)
	})
}

const Posts: NextPage<Props> = ({ posts }) => {
	const { data, isRefetching, error } = useQuery<Post[], AxiosError>(
		'posts',
		async () => {
			const { data: posts } = await api.get('/posts')

			await delay(3)

			return posts
		},
		{
			initialData: posts,
			refetchOnWindowFocus: true,
			staleTime: 1000 * 60 * 1, // 1min
		}
	)

	if (error) {
		return <div>An error occured: {error?.message}</div>
	}

	return (
		<>
			{isRefetching && <h1>Estamos dando refetch...</h1>}
			<ul>
				{Array.isArray(data) &&
					data?.map((post) => (
						<li key={post.id}>
							<h1>{post.title}</h1>
							<p>{post.body}</p>
						</li>
					))}
			</ul>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	try {
		const { data: posts } = await api.get<Post[]>('/posts')

		return { props: { posts } }
	} catch (error) {
		return { props: {} }
	}
}

export default Posts
