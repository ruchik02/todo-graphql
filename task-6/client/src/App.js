import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Todo from './Pages/Todo';
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message}) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const httpLink = new HttpLink({
  uri: 'https://nearby-raven-17.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'TR0giZ4h0GxsZMVoJeA90YVkDSkS0nLVSVTI8Rczknoe7zPk3xx1E0wP2sl42PgA'
  }
});

const client = new ApolloClient({
  errorLink,
  link:httpLink,
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Todo/>
    </ApolloProvider>
  )
}

export default App
