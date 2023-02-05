import React,{useState} from 'react'
import {useMutation,useQuery} from '@apollo/client'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList';
import { GET_TODOS } from '../GraphQL/Query'
import { ADD_TODO,DEL_TODO } from '../GraphQL/Mutation'
const Todo = () => {
  const[todoItem,setTodoItem]=useState("");
  const{loading,error,data,refetch}=useQuery(GET_TODOS);
  // add todo item
  const addTodoState=(e)=>{
    e.preventDefault();
    setTodoItem(e.target.value);
    if(todoItem !== " " || /^\s*$/.test(todoItem)){
      let temp_id = Date.now();
      console.log(todoItem,"14");
      insert_getTodos_one({
        variables: {
          id: temp_id,
          task: todoItem,
          isCompleted: false,
        },
      });
    }
  }
  const [insert_getTodos_one] = useMutation(ADD_TODO, {
    onCompleted: () => {
      refetch();
    },
  });
  const[delete_getTodos_by_pk]=useMutation(DEL_TODO,{
    onCompleted:()=>{
      refetch();
    }
  })
  const onChangeInput = (e) => {
    setTodoItem(e.target.value);
  };
 const handleDelete=(id)=>{
  delete_getTodos_by_pk({
    variables:{
      id:id,
    }
  })

 }
  return (
    <div>
         <h1 className="text-center text-8xl text-[#e8d4d5] font-thin">todo</h1>
        <TodoInput
        todo={todoItem}
        handleSubmit={addTodoState}
        onChangeHandler={onChangeInput}
        />
        {
          data?.getTodos.map((todo)=>{
            if(loading)
            return <h5>loading..</h5>;
            if(error){
              console.log(error);
            }else{
              return (
                <TodoList
                  value={todo.task}
                  key={todo.id}
                  handleDelete={() => handleDelete(todo.id)}
                />
              );
    
            }

          })
        }
    </div>
  )
}

export default Todo