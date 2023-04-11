const router = require('express').Router();
const {
    createUser, 
    getSingleUser,
    login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser)

router.route('/login').post(login);

router.route('/user/:userId').get(getSingleUser);

module.exports = router;
