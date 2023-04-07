const { Schema, model } = require('mongoose');

const skillSchema = new Schema(
  {
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    location: {
      type: String,
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
