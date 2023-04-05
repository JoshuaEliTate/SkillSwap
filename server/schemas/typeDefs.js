const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User{
    _id:ID
    username: String!
    email: String!
    password: String!
    skills: [Skill]
}
type Skill {
    _id:ID
    category: Category
    skillName: String!
    description: String!
    price: Int
    image: String
}
type Category {
    skills: Skill
    _id:ID
    name: String
  }

type Auth {
    token: ID
    user: User
}

type Query {
    skills: [Skill]
    skills(category: ID, name: String): [Skill]
    skill(_id: ID!): Skill
    user: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      username: String
      email: String
      password: String
    ): User
    updateSkill(_id: ID!): Skill
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs;