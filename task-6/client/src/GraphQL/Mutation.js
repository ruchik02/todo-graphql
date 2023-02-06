import {gql} from '@apollo/client';

export const ADD_TODO=gql`
  mutation MyMutation($id: bigint, $isCompleted: Boolean, $task: String) {
  insert_getTodos_one(object: {id: $id, isCompleted: $isCompleted, task: $task}) {
    id
  }
}
`;
export const DEL_TODO=gql`
mutation MyMutation($id: bigint!) {
  delete_getTodos_by_pk(id: $id) {
    task
  }
}
`
export const UPDATE_TODO=gql`
mutation MyMutation2($_eq: bigint , $task: String) {
  update_getTodos(where: {id: {_eq: $_eq}}, _set: {task: $task}) {
    returning {
      id
      isCompleted
      task
    }
  }
}
`;
export const TOGGLE_TODO=gql`
mutation MyMutation3($_eq: bigint , $isCompleted: Boolean ) {
  update_getTodos(where: {id: {_eq: $_eq}}, _set: {isCompleted: $isCompleted}) {
    returning {
      id
      isCompleted
      task
    }
  }
}
`