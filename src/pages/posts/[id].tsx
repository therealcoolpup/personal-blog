import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Post } from '@/interfaces/Post'

const GET_POST_QUERY = gql`
  query GetPost($postId: Int!) {
    postBy(postId: $postId) {
      content
      featuredImage {
        node {
          mediaItemUrl
          date
          title
          altText
        }
      }
      date
      categories {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { postId: parseInt(id as string) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const post: Post = {
    id: data.postBy.postId,
    title: data.postBy.title,
    content: data.postBy.content,
    featuredImgAlt: data.postBy.featuredImage.node.altText || '',
    featuredImgUrl: data.postBy.featuredImage.node.mediaItemUrl || '',
    category: data.postBy.categories.edges[0]?.node.name || '',
    datePosted: data.postBy.date,
  }

  return (
    <div className='w-full'>
      <h1>{post.title}</h1>
      <img className='hero-img' src={post.featuredImgUrl} alt={post.featuredImgAlt} />
      
      <div className='my-3 main-container' dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export default Post
