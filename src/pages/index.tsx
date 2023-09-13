import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import { Post } from "@/interfaces/Post";
import Link from "next/link";

const RECENT_POSTS_QUERY = gql`
  query RecentPosts {
    posts(first: 3, where: { status: PUBLISH }) {
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
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts: Post[] = data.posts.edges.map(({ node }: { node: any }) => ({
    id: node.postId,
    title: node.title,
    content: node.content,
    featuredImgAlt: node.featuredImage?.node.altText || "",
    featuredImgUrl: node.featuredImage?.node.mediaItemUrl || "",
    category: node.categories.nodes[0]?.name || "",
    datePosted: node.date,
  }));

  return (
    <>
      <Head>
        <title>Home | Azaber Blog</title>
        <meta name="description" content="Azaber personal blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col phone:flex-row w-5/6 phone:w-4/5 mx-auto mt-5">
        <div className="w-full phone:w-2/3">
          <h1>👋​ Hello I am Alex</h1>
          <span>Software Engineer</span>
          <div className="mt-3">
            <p>
              I've got a real passion for all things IT, especially software
              engineering. In my downtime, you'll often find me diving deeper
              into technologies I already know and crafting my own projects. I'm
              also a huge fan of skateboarding and always strive to learn new
              tricks.
            </p>
            <p>
              Here you will find guides that have helped me greatly, my
              experiences with learning new things, project updates and more.
            </p>
          </div>
        </div>
        <img
          className="w-full phone:w-1/3 rounded-md"
          src="/assets/images/me.webp"
          alt="Me"
        />
      </div>
      <div className="flex flex-col gap-3 w-4/5 mx-auto my-5">
        <h2>Latest Posts</h2>
        <div className="flex flex-col phone:flex-row gap-3">
          {posts.map(post => (
            <div
              key={post.id.toString()}
              className="w-full phone:w-1/3 rounded-md shadow-md bg-slate-50"
            >
              <div className="flex flex-col justify-center items-center ">
                {post.featuredImgUrl && (
                  <div className="relative w-full">
                    <Link href={`/posts/${post.id}`}>
                      <img
                        className="w-full object-cover h-48 rounded-t-md"
                        src={post.featuredImgUrl}
                        alt={post.featuredImgAlt}
                      />
                      <div className=" min-h-[10rem] p-3 flex flex-col">
                        <h3>{post.title}</h3>
                        <button className="btn btn-pri mt-auto w-fit">
                          Read more
                        </button>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
