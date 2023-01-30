const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: ID!, done: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

module.exports = typeDefs;