// import user model
const { User } = require('../models');
const { all } = require('../routes/api');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  //get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    try {
      const { username, email, password } = body;

      // Validate that the body has username, email, and password
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: 'Please provide username, email, and password' });
      }

      const user = await User.create(body);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Unable to create user. Please try again.' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (e) {
      if (e.code === 11000) {
        // Duplicate key error
        return res
          .status(400)
          .json({ message: 'User with this email or username already exists' });
      }
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
};
