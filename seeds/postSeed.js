const {Post} = require('../models');

const postData = [
    {
        title: 'Never Gonna Give You Up',
        post_text: 'Never Gonna Let You Down', 
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;