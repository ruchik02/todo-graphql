import {gql} from 'apollo-server-express';
const typeDefs=gql`
type Book {
    authorId:String!
    name: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(name: String!, authorId:String!): Book
    deleteBook(name: String!): Book
  }
`;
export default typeDefs;