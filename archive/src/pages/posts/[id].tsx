import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { Post } from "@/interfaces/Post";
import Head from "next/head";

const GET_POST_QUERY = gql`
  query GetPost($postId: Int!) {
    postBy(postId: $postId) {
      title
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
            name
          }
        }
      }
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { postId: parseInt(id as string) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post: Post = {
    id: data.postBy.postId,
    title: data.postBy.title,
    content: data.postBy.content,
    featuredImgAlt: data.postBy.featuredImage.node.altText || "",
    featuredImgUrl: data.postBy.featuredImage.node.mediaItemUrl || "",
    category: data.postBy.categories.edges[0]?.node.name || "",
    datePosted: data.postBy.date,
  };

  const date = new Date(post.datePosted);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <>
      <Head>
        <title>{post.title} | Azaber Blog</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <img
          className="hero-img"
          src={post.featuredImgUrl}
          alt={post.featuredImgAlt}
        />

        <div className="main-container">
          <h1 className="w-full text-pri font-bold text-5xl mt-5">
            {post.title}
          </h1>
          <div
            className="my-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex flex-row w-full">
            <p className="text-left w-1/2">Published on {formattedDate}</p>
            <p className="text-right w-1/2">Category: {post.category}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
