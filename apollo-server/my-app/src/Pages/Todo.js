import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoLists";


const Todo = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <h1 className="text-center text-9xl text-[#f2d5d7] font-thin">TODO</h1>
      <TodoInput
      />
      <TodoList/>
    </div>
  );
};

export default Todo;
