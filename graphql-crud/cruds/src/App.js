import React from 'react'
import Data from './Pages/data'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import {onError} from '@apollo/client/link/error';
const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});


const App = () => {
  return (
    <ApolloProvider client={client}>
    <div className="todo-app">
      <h1>Book Card</h1>
      <Data />
    </div>
  </ApolloProvider>

  )
}

export default App