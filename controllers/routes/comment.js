const {Comment, AppUser, Post } = require('../../models');

exports.createComment = async (req, res) => {
    try {

        const {post_id, comment_text} = req.body;

        const data = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user.id,
            post_id: req.params.id,
        });

        res.status(200).redirect(`/post/${req.params.id}`);
        


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
