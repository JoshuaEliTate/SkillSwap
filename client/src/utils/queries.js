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
      email
      skills {
        skillName
        description
        price
      }
    }
  }
`;

export const QUERY_ALL_USER = gql`
  query Users {
    users {
      _id
      username
    }
  }
`;
