const router = require('express').Router();
const {
    createSkill, 
    grabSkills,
} = require('../../controllers/skill-controller');


// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createSkill);
router.route('/:category').get(grabSkills);


module.exports = router;