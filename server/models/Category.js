const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Skills'
    }
  ]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
