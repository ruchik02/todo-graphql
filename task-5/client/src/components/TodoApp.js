import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation createTodo($todo: String!) {
        createTodo(todo: $todo) {
          id
          todo
        }
      }
    `;

    const variables = { todo };
    const res = await axios.post("http://localhost:4000/graphql", {
      query,
      variables,
    });

    setTodo("");
    setTodos([...todos, res.data.data.createTodo]);
  };

  const handleDelete = async (id) => {
    const query = `
      mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
          id
        }
      }
    `;

    const variables = { id };
    await axios.post("http://localhost:4000/graphql", {
      query,
      variables,
    });

    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="text-center flex items-center flex-col">
      <form onSubmit={handleSubmit} className="mb-3 mt-2 drop-shadow-lg text-center">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="m-0 w-96 py-4 px-2 italic font-thin focus:border-current"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="bg-white p-4 text-gray-400">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((t) => (
            <li key={t.id} className="px-2 py-4 my-3 mx-3 text-gray-500 font-thin text-2xl focus:outline-none justify-between ">
            <input type="checkbox"className="mx-3" />
            {t.todo}{" "}
            <button onClick={() => handleDelete(t.id)} className="mx-1 px-1 rounded text-black text-2xl">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;