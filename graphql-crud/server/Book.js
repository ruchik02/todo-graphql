import mongoose from "mongoose";
const schema=mongoose.Schema;
const todoSchema=new schema({
    name:String,
});
const Book=mongoose.model('book',todoSchema);
export default Book;