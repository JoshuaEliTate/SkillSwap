const router = require('express').Router();
const {
  createUser,
  login,
  getAllUsers,
  getSingleUser,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/signup').post(createUser);

router.route('/login').post(login);

router.route('/all').get(getAllUsers);

router.route('/user/:userId').get(getSingleUser);

module.exports = router;
