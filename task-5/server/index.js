const { ApolloServer, gql } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");

const typeDefs = gql`
  type Todo {
    id: ID!
    todo: String!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    createTodo(todo: String!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

let todos = [];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (_, { todo }) => {
      const newTodo = {
        id: uuidv4(),
        todo,
      };
      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_, { id }) => {
      const todoIndex = todos.findIndex((t) => t.id === id);
      const deletedTodo = todos[todoIndex];
      todos = [
        ...todos.slice(0, todoIndex),
        ...todos.slice(todoIndex + 1),
      ];
      return deletedTodo;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});