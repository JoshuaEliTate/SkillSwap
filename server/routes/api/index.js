const router = require('express').Router();
const userRoutes = require('./user-routes');
const skillRoutes = require('./skill-routes');

router.use('/users', userRoutes);
router.use('/skill', skillRoutes);

module.exports = router;
