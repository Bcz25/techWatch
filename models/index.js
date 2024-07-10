const  Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');


User.hasMany(Post, {
});

Post.belongsTo(User, {
});

Post.hasMany(Comment, {  
});

Comment.belongsTo(Post, {
});

module.exports = { Post, User, Comment };