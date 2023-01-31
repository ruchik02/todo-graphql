import Todo from "./Todo.js";
const resolvers={
    Query:{
        getTodos:async ()=>{
            const todos=await Todo.find();
            return todos
        },
        getTodo:async (root,args)=>{
            const todo=await Todo.findById(args.id);
            return todo
        }
    },
    Mutation:{
        addTodo:async(root,args)=>{
            const newTodo=new Todo({task:args.task,isCompleted:args.isCompleted});
            await newTodo.save()
            return newTodo

        },
        deleteTodo:async(root,args)=>{
            await Todo.findByIdAndDelete(args.id);
            return "todo is deleted successfully"
        },
        updateTodo:async(root,args)=>{
            const{task,isCompleted,id}=args;
            const updateTodo={};
            if(task!=undefined){
                updateTodo.task=task
            }
            if(isCompleted!=undefined){
                updateTodo.isCompleted=isCompleted
            }
            if(id!=undefined){
                updateTodo.id=id;
            }
            const todo=Todo.findByIdAndUpdate(id,updateTodo,{new:true});
            return todo;
        }

    }
}
export default resolvers;