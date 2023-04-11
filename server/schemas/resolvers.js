const { AuthenticationError } = require('apollo-server-express');
const { User, Skill, Category, Session} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async (parent, args, context) => {
     return await Category.find(context).populate('skills')
    },
    skills: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return Skill.find(params).populate('user');
    },
    skill: async (parent, { id }) =>
      Skill.findById(id).populate('user'),

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate('skills');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateSkill: async (parent, context) => {
        if (context.skill) {
            return Skill.findByIdAndUpdate(context.skill.id, args, {
              new: true,
            });
          }
    },
    updateSession: async (parent, { id, quantity }) => {
        if (context.session) {
            return Session.findByIdAndUpdate(context.session.id, args, {
              new: true,
            });
          }
      },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
