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
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
    // category: [Category.schema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Skill = model('Skill', skillSchema);

module.exports = Skill;
