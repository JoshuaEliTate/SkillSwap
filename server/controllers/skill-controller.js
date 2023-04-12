const { Skill } = require('../models');

module.exports = {
  grabSkills(req, res) {
    Skill.find()
      .then((skills) => res.json(skills))
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createSkill(req, res) {
    Skill.create(req.body)
      .then((dbSkillData) => res.json(dbSkillData))
      .catch((err) => res.status(500).json());
  },
};
