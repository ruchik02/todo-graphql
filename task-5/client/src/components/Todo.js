    import React, { useState } from "react";
    import { useQuery, useMutation,gql } from "@apollo/client";
    import "../index.css";
    const GET_TODOS = gql`
    query {
        todos {
        id
        todo
        }
    }
    `;

    const CREATE_TODO = gql`
    mutation CreateTodo($todo: String!) {
        createTodo(todo: $todo) {
        id
        todo
        }
    }
    `;

    const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id) {
        id
        }
    }
    `;
    function Todos() {
        const { data, loading, error } = useQuery(GET_TODOS);
        const [createTodo] = useMutation(CREATE_TODO, {
            update(cache, { data: { createTodo } }) {
              const { todos } = cache.readQuery({ query: GET_TODOS });
              cache.writeQuery({
                query: GET_TODOS,
                data: { todos: todos.concat([createTodo]) },
              });
            },
          });
        const [deleteTodo] = useMutation(DELETE_TODO,{
            update(cache, { data: { deleteTodo } }) {
            const { todos } = cache.readQuery({ query: GET_TODOS });
            cache.writeQuery({
            query: GET_TODOS,
            data: { todos: todos.filter((todo) => todo.id !== deleteTodo.id) },
            });
            },
            });
            
            const [todoInput, setTodoInput] = useState("");
            const handleSubmit = (e) => {
            e.preventDefault();
            createTodo({ variables: { todo: todoInput } });
            setTodoInput("");
            };
            
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            
            return (
            <div className="text-center flex items-center flex-col">
            <form onSubmit={handleSubmit} className="mb-3 mt-2 drop-shadow-lg text-center">
            <input
            type="text"
            placeholder="What needs to be done?"
            className="m-0 w-96 py-4 px-2 italic font-thin focus:border-current"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            />
            <button type="submit" className="bg-white p-4 text-gray-400">Add Todo</button>
            </form>
            <ul className="todo-list">
            {data.todos.map((todo) => (
            <li key={todo.id} className="px-2 py-4 my-3 mx-3 text-gray-500 font-thin text-2xl focus:outline-none justify-between ">
                <input type="checkbox"className="mx-3" />
            {todo.todo}
            <button
            onClick={() =>
            deleteTodo({
            variables: { id: todo.id },
            })
            }
            className="mx-1 px-1 rounded text-red-600 text-2xl"
            >
        X
            </button>
            </li>
            ))}
            </ul>
            </div>
            );
            }
            
         export default Todos;