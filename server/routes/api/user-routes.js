const router = require('express').Router();
const {
    createUser, 
    getSingleUser,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);
router.route('/:userId').get(getSingleUser);

module.exports = router;
