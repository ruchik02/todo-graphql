import express from 'express';
import {ApolloServer,gql} from 'apollo-server-express';
import Todo from './Todo.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
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
todos: async (parent, args, context, info) => {
const todos = await Todo.find();
return todos;
},
},
Mutation: {
createTodo: async (parent, args, context, info) => {
const newTodo = new Todo({
id: uuidv4(),
todo: args.todo,
});
const savedTodo = await newTodo.save();
return savedTodo;
},
deleteTodo: async (parent, args, context, info) => {
const deletedTodo = await Todo.findOneAndDelete({ id: args.id });
return deletedTodo;
},
},
};
async function initServer(){
    const app=express();
    app.use(cors());
    dotenv.config()
    const apolloServer=new ApolloServer({typeDefs,resolvers});
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use((req,res)=>{
        res.send("Server started successfully")
    });
    const PORT=4000;
    try {
        mongoose.set("strictQuery", "false");
        await mongoose.connect(process.env.mongodb)
        console.log(`connected to MongoDB at port ${PORT}`);
    } catch (error) {
        console.log(error); 
    }
    app.listen(PORT,()=>{
        console.log(`Express is running on the port ${PORT}`);
    })

}
initServer()