const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use(apiRoutes);

// serve up react front-end in production
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

router.use((req, res) => {
  console.log(res);
});

module.exports = router;
