import { gql } from '@apollo/client';

export const QUERY_SKILLS = gql`
  query allSkills {
    skills {
      _id
      skillName
      description
      price
      user
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      skills
    }
  }
`;
