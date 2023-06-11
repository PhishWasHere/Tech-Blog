const {AppUser} = require('../../models');



exports.login = (req, res) => {
    try {

        if (req.session.logged_in) {
            res.status(302).redirect('/profile'); //redir to user profile if already logged in, couldve made this a helper fn or something in heindsite
            return;
        }

        res.status(200).render('profile', {formPartial: 'login'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.userLogin =  async (req, res) => {
    try {

        if (req.session.loggedIn) {
            res.status(302).redirect('/profile');
            return;
        }

        const userData = await AppUser.findOne({ //finds a user by their username
        where: {
            username: req.body.username.trim(), //trim removes whitespace
            },
        });

        const validPassword = await userData.checkPassword(req.body.password.trim());

        if (!validPassword || !userData) { //if the password is invalid or the user doesnt exist
            res.status(500).json({ alert: 'email or password incorrect' }); //send an error
            return;
        }

        req.session.save(() => {
            req.session.user = {}; //create a session for the user
            req.session.user.id = userData.id; //set the user id
            req.session.loggedIn = true; //set logged in to true
            res.status(200).redirect('/');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


