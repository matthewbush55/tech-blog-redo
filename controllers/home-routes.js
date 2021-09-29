const { User, Post, Comment } = require("../models/");

const router = require("express").Router();

// localhost:PORT/

// GET all posts if there are any and render to homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
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
    res.render("homepage", {
      allPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route to redirect a logged in user to the homepage or serve the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// GET route to redirect a logged in user to the homepage or serve the signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// GET route to get a single post by the id
router.get("/post/:id", async (req, res) => {
  const dbPostData = await Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "contents", "title", "created_at"],
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
  if (!dbPostData) {
    res.status(404).json({ message: "No post found with this id" });
    return;
  }
  const post = dbPostData.get({ plain: true });
  res.render("post", { post, loggedIn: req.session.loggedIn });
});

module.exports = router;
