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
                       model: AppUser ,
                        },
                    ]
                },
                {
                    model: AppUser,
                }
            ],
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        console.log(post, 'user ID', req.session.user.id);

        res.status(200).render('postDetails', {
            post,
            currentUserID: req.session.user.id,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
};


exports.newPost = async (req, res) => {
    try {
        res.status(200).render('newPost',{
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.createPost =  async (req, res) => {
    try {

        const data = ({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user.id,
        });

        const createdPost = await Post.create(data);
        const postId = createdPost.id;
        console.log(postId);

        res.status(200).redirect(`/post/${postId}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

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

exports.deletePost = async (req, res) => {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).redirect('/profile');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.editPostHBS = async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [ 
                        {
                       model: AppUser ,
                        },
                    ]
                },
            ],
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        console.log('in edit hbs');
        res.status(200).render('profile', {formPartial: 'editPost',
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
}
console.log('post route git');
exports.editPost = async (req, res) => {
    console.log('editpost');
    try {
        const data = await Post.update(
            {
                title: req.body.title,
                post_text: req.body.post_text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).redirect(`/post/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}