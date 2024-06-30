import { ApolloClient, InMemoryCache } from "@apollo/client";
import { headers, url } from "./headers";

const client = new ApolloClient({
  uri: url,
  headers,
  cache: new InMemoryCache(),
});

export default client;
