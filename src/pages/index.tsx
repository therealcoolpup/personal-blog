import Head from 'next/head'
import { useQuery, gql } from '@apollo/client'
import { Post } from '@/interfaces/Post'
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';

const RECENT_POSTS_QUERY = gql`
  query RecentPosts {
    posts(first: 3, where: {status: PUBLISH}) {
      edges {
        node {
          
          postId
          title
          content
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
          categories {
            nodes {
              name
            }
          }
          date
        }
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const posts: Post[] = data.posts.edges.map(({ node }) => ({
    id: node.postId,
    title: node.title,
    content: node.content,
    featuredImgAlt: node.featuredImage?.node.altText || '',
    featuredImgUrl: node.featuredImage?.node.mediaItemUrl || '',
    category: node.categories.nodes[0]?.name || '',
    datePosted: node.date,
  }));


  return (
    <>
      <Head>
        <title>Azaber personal blog</title>
        <meta name="description" content="Azaber personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full'> 
        <Carousel fade interval={1500} controls={false}>         
          {posts.map(post => (
            <Carousel.Item key={post.id}>
              <div className='flex flex-col justify-center items-center h-[70vh] phone:h-[80vh]'>
                {post.featuredImgUrl && (
                  <div className='relative w-full'>
                    <img className='w-full object-cover h-[70vh] phone:h-auto' src={post.featuredImgUrl} alt={post.featuredImgAlt} />
                    <div className="overlay"></div>
                  </div>
                )}
              </div>
              <Carousel.Caption>
                <div className='h-56 flex justify-start items-start'>
                  <h3 className='text-white'><Link href={`/posts/${post.id}`}>{post.title}</Link></h3>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default Home
