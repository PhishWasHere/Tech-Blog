const {Comment, AppUser, Post } = require('../../models');
const logInVali = require('../../utils/loginVal');


exports.getPost = async (req, res) => {
    try {

        let postId = req.params.id || null;

        const dbPostData = await Post.findByPk(postId, {
            include: [
                {
                    model: Comment,
                    model: AppUser ,
                },
            ],
        });
        
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.status(200).render('postDetails', {
            post,
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

        const data = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user.id,
        });

        res.status(200).render('newPost',{
            loggedIn: req.session.loggedIn,
        });
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
