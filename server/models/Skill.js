const { Schema, model } = require('mongoose');
const Category = require('./Category');

const skillSchema = new Schema(
  {
    skillName: {
      type: String,
      required: false,
      unique: false,
    },
    price: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    category: {
      type: String,
      required: false,
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Skill = model('Skill', skillSchema);

module.exports = Skill;
