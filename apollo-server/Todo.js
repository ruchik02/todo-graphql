import mongoose from "mongoose";
const schema=mongoose.Schema;
const todoSchema=new schema({
    task:String,
    isCompleted:Boolean
});
const Todo=mongoose.model('todo',todoSchema);
export default Todo;