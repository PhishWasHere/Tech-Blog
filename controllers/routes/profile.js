const {AppUser, Post, Comment} = require('../../models');

exports.profile = async (req, res) => {
    try {

        if(!req.session.loggedIn) {
            res.redirect('/login'); //redirect to login if not logged in
            return;
        }
        
        let profileId = req.session.user.id || null;

        const userData = await AppUser.findByPk(profileId, { // finds a user by its primary key, or by the id passed in the url
            attributes: { exclude: ['password'] }, //exclude the password from the query
            include: [ //include the posts and comments the user has made
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

        res.status(200).render('profile', {formPartial: 'userPosts', 
            user,
            loggedIn: req.session.loggedIn
        });
 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
