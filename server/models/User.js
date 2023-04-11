const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Skill = require('./Skill');
// import schema from Book.js
// const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    skills: [Skill.schema], //changed this back to "skills"
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// you probably won't need this virtual
// If needed, please rename this virtual to avoid any potential naming conflicts.
userSchema.virtual('virtualSkills').get(function () {
  return this.skills.length;
});

const User = model('User', userSchema);

module.exports = User;