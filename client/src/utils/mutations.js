import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SKILL = gql`
mutation addSkill($skillName: String, $description: String, $price: Int, $category: String) {
  addSkill(skillName: $skillName, description: $description, price: $price, category: $category ) {
    skillName
    description
    price
    category
    user {
      _id
      username
    }
  }
}`
