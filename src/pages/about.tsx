import React from "react";
import { useQuery, gql } from "@apollo/client";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import Head from "next/head";

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
  const { loading, error, data } = useQuery(ABOUT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const content = data?.pageBy.content;
  const featuredImage = data?.pageBy.featuredImage;

  return (
    <>
      <Head>
        <title>About | Azaber Blog</title>
        <meta name="description" content="Azaber personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {featuredImage && (
          <Fade>
            <img
              className="hero-img"
              src={featuredImage.node.mediaItemUrl}
              alt={featuredImage.node.altText}
            />
          </Fade>
        )}
        <div className="main-container">
          <Slide bottom>
            <p className="my-3">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </p>
          </Slide>
        </div>
      </div>
    </>
  );
};

export default About;
