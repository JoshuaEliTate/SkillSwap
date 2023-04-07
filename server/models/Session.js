const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
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


const Session = model('Session', sessionSchema);

module.exports = Session;
