const {Comment} = require('../models');

const commentData = [
    {
        comment_text: 'Never gonna make you cry, Never gonna say goodbye',
        user_id: 2,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;