const { ApolloServer, gql } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");
const mongodb = require("mongodb");

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

const resolvers = {
  Query: {
    todos: async () => {
      const todos = await Todos.find({}).toArray();
      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, { todo }) => {
      const newTodo = {
        id: uuidv4(),
        todo,
      };
      await Todos.insertOne(newTodo);
      return newTodo;
    },
    deleteTodo: async (_, { id }) => {
      const deletedTodo = await Todos.findOneAndDelete({ id });
      return deletedTodo.value;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const client = await mongodb.MongoClient.connect(
      "mongodb://ruchika:ruchika@ac-qbbvmer-shard-00-00.0wrznwh.mongodb.net:27017,ac-qbbvmer-shard-00-01.0wrznwh.mongodb.net:27017,ac-qbbvmer-shard-00-02.0wrznwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-11l66e-shard-0&authSource=admin&retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
    const db = client.db("todos");
    const Todos = db.collection("todos");
    return { Todos };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});