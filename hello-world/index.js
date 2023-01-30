const { ApolloServer, gql } = require('apollo-server');
const{ApolloServerPluginLandingPageGraphQLPlayground}=require('apollo-server-core')
const arr=[{
    greeting:'ruchika sharma',
    add:'10',
}];
const typeDefs = gql`
  type Object{
    greeting:String
    add:String
  }
#   type Todo {
#   id: ID!
#   task: String!
#   completed: Boolean
# }

# type Query {
#   todos: [Todo]
#   todo(id: ID!): Todo
# }

# type Mutation {
#   addTodo(task: String!): Todo
#   updateTodo(id: ID!, task: String, completed: Boolean): Todo
#   deleteTodo(id: ID!): Todo
# }
  type Query {
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
    hello:String!
    id:[Object]
  }
`;

const resolvers = {
  Query: {
    greeting: (_, { name }) => `Hello ${name || 'World'}!`,
    add: (_, { a, b }) => a + b,
    hello:()=>'hello World',
    id:()=>arr
  },
};

const server = new ApolloServer({ typeDefs, resolvers
//     ,plugins:[
// ApolloServerPluginLandingPageGraphQLPlayground 
// ]
});

// const PORT = 4000;

// server.listen(PORT).then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });