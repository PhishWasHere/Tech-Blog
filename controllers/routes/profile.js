const {AppUser, Post, Comment} = require('../../models');

exports.profile = async (req, res) => {
    try {

        let profileId = req.params.user.id || null;
        console.log('user id: ', profileId);
        if(!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        const userData = await AppUser.findByPk(profileId, {
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

        res.status(200).render('profile', {formPartial: 'userPosts'}, {
            user,
            
        });
 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
