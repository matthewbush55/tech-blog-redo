const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// localhost:3002/api/users/

// GET to get all Users info (testing to see if we can get all the data)
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// GET one User by user_id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: req.params.id },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "contents", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Includes for Posts & Comments for this user by user_id

// POST for new user signup
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// POST for login to check if user exists and validate creds

// POST for user logout

// DELETE user

// PUT for updating user info

module.exports = router;
