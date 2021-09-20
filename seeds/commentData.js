const Comment = require("../models/Comment");

const commentdata = [
  {
    comment: "Great post User 1",
    post_id: 1,
    user_id: 2,
  },
  {
    comment: "Nice post User 2",
    post_id: 2,
    user_id: 1,
  },
];
const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
