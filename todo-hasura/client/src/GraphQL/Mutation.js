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