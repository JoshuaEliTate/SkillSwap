const db = require('../config/connection');
const { User, Skill } = require('../models');
const userSeeds = require('./userSeeds.json');
const skillSeeds = require('./skillSeeds.json');

db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userSeeds);
  await Skill.create(skillSeeds);
  console.log('All done!');
  process.exit(0);
});
