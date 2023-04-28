import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      edges {
        node {
          postId
          title
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
          date
        }
      }
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  const [numPosts, setNumPosts] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        setNumPosts(prevNumPosts => prevNumPosts + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const posts = data.posts.edges
    .filter(post =>
      post.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, numPosts);

  return (
    <div>
      <div className="flex justify-center my-3">
        <input
          type="text"
          placeholder="Search by title..."
          className="border border-gray-400 px-4 py-2 rounded w-64"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-3 my-3 mx-auto justify-center items-center">
        {posts.map(post => {
          // Parse the date string
          const date = new Date(post.node.date);

          return (
            <Link href={`posts/${post.node.postId}`} key={post.node.postId}>
              <div className="w-72">
                <img
                  src={post.node.featuredImage.node.mediaItemUrl}
                  alt={post.node.featuredImage.node.altText}
                  className="w-72 h-60 mx-auto rounded-t-md"
                />
                <div className="flex-col bg-slate-50 rounded-b-md h-52 p-3">
                  <h2 className="text-pri text-xl h-14">{post.node.title}</h2>
                  <p className="text-sec text-lg">
                    Categories:{" "}
                    {post.node.categories.edges
                      .map(category => category.node.name)
                      .shift()}
                  </p>
                  <p className="text-sec text-md">
                    Date: {date.toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
