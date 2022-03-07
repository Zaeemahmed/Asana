import { gql } from '@apollo/client';

export default gql`
  mutation CreateTask(
    $description: String
    $id: String
    $status: String
    $title: String!
    $userId: String
  ) {
    createTask(
      description: $description
      id: $id
      status: $status
      title: $title
      userId: $userId
    ) {
      id
      title
      description
      status
    }
  }
`;
