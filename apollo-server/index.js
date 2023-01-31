import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
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
    const PORT=5000;
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