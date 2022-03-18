import { AxiosError } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
<% if (useQuery) { %> 
  import { useQuery } from 'react-query' 
<% } %>

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
<% if (useQuery) { %>
  const delay = (seconds: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000 * seconds)
    })
  }
<% } %>
const Posts: NextPage<Props> = ({ posts }) => {
<% if (useQuery) { %>
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
<% } %>

	return (
    <% if (useQuery) { %>
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
<% } else { %>
			<ul>
				{Array.isArray(posts) &&
					posts.map((post) => (
						<li key={post.id}>
							<h1>{post.title}</h1>
							<p>{post.body}</p>
						</li>
					))}
			</ul>
<% } %>
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
