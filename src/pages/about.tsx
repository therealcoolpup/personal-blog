import React from "react";
import { useQuery, gql } from "@apollo/client";
import { PageContent } from "@/interfaces/PageContent";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

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
  const { loading, error, data } = useQuery<PageContent>(ABOUT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const { content, featuredImage } = data?.pageBy ?? {};

  return (
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
  );
};

export default About;
