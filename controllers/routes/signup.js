const {AppUser} = require('../../models');


exports.signupPage = async (req, res) => {
    try {
        if (req.session.logged_in) { //if the user is logged in
            res.redirect('/profile');
            return;
        }

        res.status(200).render('profile', {formPartial: 'signup'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.signup = async (req, res) => { 
    try {

        if (req.session.logged_in) { //if the user is logged in
            res.redirect('/profile');
            return; 
        }

        const data = await AppUser.create({
            username: req.body.username.trim(),
            email: req.body.email.trim(),
            password: req.body.password.trim(),
        });

        res.status(200).redirect('/login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};