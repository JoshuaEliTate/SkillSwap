const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use( apiRoutes);


router.use((req, res) => {
  console.log(res);
});

module.exports = router;
