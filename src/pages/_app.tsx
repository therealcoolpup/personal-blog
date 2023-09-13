import "../styles/main.scss";
import type { AppProps } from "next/app";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Socials from "@/components/Socials";
import Head from "next/head";

const httpLink = createHttpLink({
  uri: "https://blog-backend.azaber.com/graphql", // replace with your GraphQL API endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {" "}
      <Head>
        <script
          src="https://kit.fontawesome.com/1e1f15503e.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div>
        <Nav />
        <main className="mt-20 flex flex-col justify-center items-center w-full mx-auto">
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </main>
        <Socials />
        <Footer />
      </div>
    </>
  );
}
