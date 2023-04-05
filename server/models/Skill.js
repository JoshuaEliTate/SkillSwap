const { Schema, model } = require('mongoose');

const skillSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    skillName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
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
