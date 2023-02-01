    import React,{ useState} from "react";
    import {gql, useMutation } from "@apollo/client";
    const ADD_TODO = gql`
    mutation addTodo($task: String, $isCompleted: Boolean, $id: ID) {
      addTodo(task: $task, isCompleted: $isCompleted, id: $id) {
        id
        task
        isCompleted
      }
    }
    `;
    const TodoInput = () => {
        const[todo,setTodo]=useState(
            {
                task: "",
                isCompleted: "",
                id: "",
              }
            
        );
        console.log(todo,"6");
        const [addTodo,{data}] = useMutation(ADD_TODO);
        const onSubmit=(e)=>{
            e.preventDefault();
            const{task,id,isCompleted}=e.target.elements;
            addTodo({variables:{
                task: task.value,
                id:id.value,
                isCompleted:isCompleted.value
            }})
            setTodo("");
            

        }
    return (
        <>
        <form className="mb-3 drop-shadow-lg" onSubmit={onSubmit}>
            <input
            type="text"
            placeholder="What needs to be done?"
            className=" m-0 w-96 py-4 px-2 italic font-normal focus:border-none"
            value={todo.task}
            onChange={(e)=>setTodo({...todo,task:e.target.value})}
            />
            <button
            className="bg-white p-4 text-gray-400 "
            >
            Add
            </button>
        </form>
        </>
    );
    };

    export default TodoInput;
