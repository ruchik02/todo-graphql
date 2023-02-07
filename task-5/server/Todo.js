import mongoose from "mongoose";
const schema=mongoose.Schema;
const todoSchema=new schema({
    todo:String,
});
const Todo=mongoose.model('todo',todoSchema);
export default Todo;