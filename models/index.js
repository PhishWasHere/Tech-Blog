const AppUser = require('./AppUser');
const Post = require('./Post');
const Comment = require('./Comment');


AppUser.hasMany(Post, {
    foreignKey: 'user_id',

});

Post.belongsTo(AppUser, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(AppUser, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

AppUser.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = {AppUser, Post, Comment};