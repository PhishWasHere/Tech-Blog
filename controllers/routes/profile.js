const {AppUser, Post, Comment} = require('../../models');

exports.profile = async (req, res) => {
    try {

        let profileId = req.session.user.id || null;

        if(!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }


        const userData = await AppUser.findByPk(profileId, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_text', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                },
            ],
            
        });

        if(!userData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }

        const user = userData.get({ plain: true });
        console.log(user);

        res.status(200).render('profile', {formPartial: 'userPosts', 
            user,
            loggedIn: req.session.loggedIn
        });
 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
