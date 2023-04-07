const { Schema, model } = require('mongoose');

const skillSchema = new Schema(
  {

    category: {
      type: String,
      required: true,
      unique: false,
    },
    skillName: {
      type: String,
      required: true,
      unique: false,
    },
    price: {
      type: Number,
      required: false,
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
