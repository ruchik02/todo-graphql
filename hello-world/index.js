const { ApolloServer, gql } = require('apollo-server');
const{ApolloServerPluginLandingPageGraphQLPlayground}=require('apollo-server-core')

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers,plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground()
] });

// const PORT = 4000;

// server.listen(PORT).then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });