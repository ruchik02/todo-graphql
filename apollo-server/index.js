const express=require('express');
const {ApolloServer,gql}=require('apollo-server-express');
const typeDefs=gql`
type Query{
    Welcome:String!
}
`;
const resolvers={
    Query:{
        Welcome:()=>'hello Welcome Ruchika'
    }
}
async function initServer(){
    const app=express();
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