const { User } = require("./User");
const { Post } = require("./Post");
const { Comment } = require("./Comment");

// User has many posts
User.hasMany(Post, { foreignKey: "user_id" });

// Post belongs to one user
Post.belongsTo(User, { foreignKey: "user_id" });

// Post has many comments
Post.hasMany(Comment, { foreignKey: "post_id" });

// Comment belongs to one post
Comment.belongsTo(Post, { foreignKey: "post_id" });

// Users have many comments
User.hasMany(Comment, { foreignKey: "user_id" });

// Comments belong to one user
Comment.belongsTo(User, { foreignKey: "user_id" });
