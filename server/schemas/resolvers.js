const { AuthenticationError } = require('apollo-server-express');
const { User, Skill, Category, Session } = require('../models');
const { signToken } = require('../utils/auth');
const { findById } = require('../models/Category');

const resolvers = {
  Query: {
    categories: async () => Category.find(),
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
    skill: async (parent, { id }) => Skill.findById(id).populate('user'),

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('skills');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSkill: async (parent, args, context) => {
      console.log('context.user', context.user);
      console.log('context.user._id', context.user._id);
      const object = await { ...args, user: context.user._id };
      const skill = await Skill.create(object);
      const user = await User.findById(context.user._id);
      user.skills.push(skill._id);
      await user.save();
      const finalSkill = await Skill.findById(skill._id)
        .populate('user')
        .populate({
          path: 'skills',
          populate: 'skill',
        });
      console.log(finalSkill);
      return finalSkill;
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
