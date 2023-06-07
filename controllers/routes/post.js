const {Comment, User, Post } = require('../../models');

exports.getPost = async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
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
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.newPost = async (req, res) => {
    try {
        const data = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
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
