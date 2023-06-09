const {Comment, AppUser, Post } = require('../../models');


exports.getPost = async (req, res) => {
    try {

        let postId = req.params.id || null;

        const dbPostData = await Post.findByPk(postId, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: AppUser,
                        },
                    ],
                },
            ],
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.status(200).render('post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.createPost = async (req, res) => {
    try {
        const data = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user.id,
            post_id: req.params.id,
        });

        res.status(200).redirect('/post:id', {
            post_id: req.params.id,
        });


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
