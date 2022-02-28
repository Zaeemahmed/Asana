import { gql } from '@apollo/client';

export default gql`
    query {
        tasks {
            id
            title 
            description
            status
        }
    }
`;

