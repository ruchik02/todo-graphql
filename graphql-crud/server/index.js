import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
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
    app.listen(PORT,()=>{
        console.log(`Express is running on the port ${PORT}`);
    })

}
initServer()