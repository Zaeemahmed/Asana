import { gql } from '@apollo/client';

export default gql`
    mutation deleteTaskMutation($id: String) {
        deleteTask(id: $id) {
            id
        }
    }
`;

