const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User{
    _id:ID
    username: String!
    email: String!
    password: String!
    skills: [Skill]
}
type Session{
    _id:ID
    date: String
    time: String
    location: String
}
type Skill {
    _id:ID
    skillName: String
    description: String
    price: Int
    user: User
}
type Category {
    skills: [Skill]
    _id:ID
    name: String
  }

type Auth {
    token: ID
    user: User
}

type Query {
    skills(category: ID, name: String): [Skill]
    skill(_id: ID!): Skill
    user(userId: ID!): User
    session: Session
    categories: Category
    me: User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    addSkill(
      skillName: String
      description: String
      price: Int
    ): Skill
    updateUser(
      username: String
      email: String
      password: String
    ): User
    updateSkill(_id: ID!): Skill
    updateSession(_id: ID!): Session
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs;