const {Comment, AppUser, Post } = require('../../models');

exports.getPost = async (req, res) => {
    try {

        let postId = req.params.id || null;

        const dbPostData = await Post.findByPk(postId, { // finds a post by its primary key, or by the id passed in the url
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

        res.status(200).render('postDetails', {
            post,
            loggedIn: req.session.loggedIn, //pass in the session variable so the {{#if loggedIn}} handlebars works
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

        const data = ({ // create a new post and links it to a user
            title: req.body.title.trim(),
            post_text: req.body.post_text.trim(),
            user_id: req.session.user.id,
        });

        const createdPost = await Post.create(data); // creates a new post 
        const postId = createdPost.id; // gets the id of the post that was just created

        res.status(200).redirect(`/post/${postId}`); // redirects to the post page
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.createComment = async (req, res) => {
    try {

        const data = await Comment.create({ // creates a new comment and links it to a user and a post
            comment_text: req.body.comment_text.trim(),
            user_id: req.session.user.id,
            post_id: req.params.id,
        });

        res.status(200).redirect(`/post/${req.params.id}`); // redirects to the post page

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.deletePost = async (req, res) => {
    try { 
        const data = await Post.destroy({ // deletes a post by its primary key
            where: {
                id: req.params.id,
            },
            include: [ Comment ], // also deletes all comments associated with the post
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
        const dbPostData = await Post.findByPk(req.params.id, { // finds a post by its primary key
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

        res.status(200).render('profile', {formPartial: 'editPost', // renders the edit post form
            post,
            loggedIn: req.session.loggedIn, //pass in the session variable so the {{#if loggedIn}} handlebars works
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
}

exports.editPost = async (req, res) => {

    try {
        const data = await Post.update( // updates a post by its primary key
            {
                title: req.body.title.trim(),
                post_text: req.body.post_text.trim(),
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

        res.status(200).redirect(`/post/${req.params.id}`); // redirects to the post page
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}