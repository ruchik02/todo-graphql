// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const app = express();
// const typeDefs = require('./schema/schema');
// const resolvers=require('./schema/resolvers')
// const server = new ApolloServer({ typeDefs, resolvers });
// const PORT = 4000;
// const startServer = async () => {
    
//  await server.applyMiddleware({ app });
//     app.listen({ port: PORT }, () => {
//       console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//     });
//   };
//  await startServer();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
 const resolvers=require('./schema/resolvers')

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const PORT = 4000;

server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});