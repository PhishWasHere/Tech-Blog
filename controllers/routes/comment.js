const {Comment} = require('../../models');

exports.createComment = async (req, res) => {
    try {

        const data = await Comment.create({ // create a new comment and links it to a post and user
            comment_text: req.body.comment_text.trim(), //trim removes whitespace
            user_id: req.session.user.id,
            post_id: req.params.id,
        });

        res.status(200).redirect(`/post/${req.params.id}`); // redirects to the post page

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
