const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// GET to get all Users info (testing to see if we can get all the data)
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// GET one User by user_id
// Includes for Posts & Comments for this user by user_id

// POST for new user signup

// POST for login to check if user exists and validate creds

// POST for user logout

// DELETE user

// PUT for updating user info
