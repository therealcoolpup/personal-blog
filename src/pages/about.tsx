import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { PageContent } from '@/interfaces/PageContent';

const ABOUT_QUERY = gql`
  query AboutPage {
    pageBy(uri: "about") {
      content
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
`;

const About = () => {
  const { loading, error, data } = useQuery<PageContent>(ABOUT_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p className='error'>Error: {error.message}</p>

  const { content, featuredImage } = data.pageBy;

  return (
    <div>
      {featuredImage && (
        <img className='w-full object-cover' src={featuredImage.node.mediaItemUrl} alt={featuredImage.node.altText} />
      )}
      <p className='my-3'><div dangerouslySetInnerHTML={{ __html: content }} /></p>
    </div>
  )
}

export default About
