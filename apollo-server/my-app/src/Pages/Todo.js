import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoLists";
import { useQuery, useMutation } from "@apollo/client";
import {GET_TODOS} from '../GraphQL/Query';
const Todo = () => {
  const{data}=useQuery(GET_TODOS);
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <h1 className="text-center text-9xl text-[#f2d5d7] font-thin">TODO</h1>
      <TodoInput
      />
       {data?.getTodos.map((todo) => (
         <TodoList
         id={todo.id}
         key={todo.id}
         task={todo.task}
         
         />
        ))}
    </div>
  );
};

export default Todo;
