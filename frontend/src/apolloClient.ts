import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
//   cache: new InMemoryCache(),
// });

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:8080/graphql", // Backend GraphQL endpoint
//     credentials: "include", // optional if you need cookies
//   }),
//   cache: new InMemoryCache(),
// });


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // make sure this matches your backend
  cache: new InMemoryCache(),
});

export default client;
