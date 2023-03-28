import "../styles/main.scss"
import type { AppProps } from 'next/app';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://blog-backend.azaber.com/graphql', // replace with your GraphQL API endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />
      <main className="flex flex-col justify-center items-center w-5/6 mx-auto my-3">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
      <Footer />
    </div>
  )
}
