const User = require("../models/User");

const userdata = [
  {
    username: "Ronald",
    password: "Grimacelovesburgerz",
  },
  {
    username: "hamburgler",
    password: "MoreBurgzPlease!",
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
