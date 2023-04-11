const { Schema, model } = require('mongoose');

const skillSchema = new Schema(
  {
    skillName: {
      type: String,
      required: false,
      unique: false,
    },
    price: {
      type: Number,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Skill = model('Skill', skillSchema);

module.exports = Skill;
