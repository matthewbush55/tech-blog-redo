const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for the logged in user
router.get("/", withAuth, async (req, res) => {
  try {
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "contents", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const allPosts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      allPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET to render new post page
router.get("/new", (req, res) => {
  res.render("new-post");
});

// GET route to edit an existing post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    Post.findOne({
      where: {
        user_id: req.params.id,
      },
      attributes: ["id", "title", "contents", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
