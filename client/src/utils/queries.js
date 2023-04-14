import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
query User($userId: ID!) {
    user(userId: $userId) {
        _id
        username
    }
  }
`;

export const QUERY_ME = gql`
query Me {
    me {
        _id
        username
        skills
        email
    }
  }`;