import { gql } from '@apollo/client';

export default gql`
  mutation updateTaskMutation(
    $description: String
    $id: String
    $status: String
    $title: String
    $userId: String
  ) {
    updateTask(
      id: $id
      description: $description
      status: $status
      title: $title
      userId: $userId
    ) {
      id
      description
      title
      status
    }
  }
`;
