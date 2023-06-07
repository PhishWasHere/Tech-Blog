const {User, Post, Comment} = require('../../models');

exports.dashboard = async (req, res) => {
    try {

        if(!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'created_at'],
                },
            ],
            
        });

        const user = userData.get({ plain: true });

        res.status(200).render('profile', {
            user,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
