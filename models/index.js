const  Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {  
  foreignKey: 'username',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'username',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { Post, User, Comment };