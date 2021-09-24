const router = require("express").Router();
// const postRoutes = require("./post-route");
const userRoutes = require("./user-route");
// const commentRoutes = require("./comment-route");

// router.use("/post", postRoutes);
router.use("/user", userRoutes);
// router.use("/comment", commentRoutes);

module.exports = router;
