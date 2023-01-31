import {gql} from 'apollo-server-express';
const typeDefs=gql`
type Todo{
  id:ID
  task:String
 isCompleted:Boolean
}
type Query{
    getTodos:[Todo]
    getTodo(id:ID):Todo

}
type Mutation{
    addTodo(task:String,isCompleted:Boolean,id:ID):Todo
    deleteTodo(id:ID):String
    updateTodo(task:String,isCompleted:Boolean,id:ID):Todo
}
`;
export default typeDefs;