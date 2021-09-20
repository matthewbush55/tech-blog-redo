const Post = require("../models/Post");

const postdata = [
  {
    title: "User 1 Post #1",
    contents:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis libero in nobis, quia alias voluptate quo quibusdam numquam nisi omnis saepe. Sequi dicta commodi voluptatum neque esse reprehenderit non exercitationem!",
    user_id: 1,
  },
  {
    title: "User 2 Post #2",
    contents:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis libero in nobis, quia alias voluptate quo quibusdam numquam nisi omnis saepe. Sequi dicta commodi voluptatum neque esse reprehenderit non exercitationem!",
    user_id: 2,
  },
];
const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
