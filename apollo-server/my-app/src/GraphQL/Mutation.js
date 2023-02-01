import { gql } from "@apollo/client";

export  const ADD_TODO = gql`
mutation addTodo($task: String, $isCompleted: Boolean, $id: ID) {
  addTodo(task: $task, isCompleted: $isCompleted, id: $id) {
    id
    task
    isCompleted
  }
}
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: String
    $task: String
    $isCompleted: Boolean
  ) {
    updateTodo(id: $id, task: $task, isCompleted: $isCompleted) {
      id
      task
      isCompleted
    }
  }
`;
