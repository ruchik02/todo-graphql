import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Todo from './Pages/Todo';
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Todo/>
    </div>
    </ApolloProvider>
  );
}

export default App;
