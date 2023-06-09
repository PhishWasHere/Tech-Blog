const {AppUser} = require('../../models');


exports.signupPage = async (req, res) => {
    try {
        if (req.session.logged_in) {
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

        if (req.session.logged_in) {
            res.redirect('/profile');
            return; 
        }

        const data = await AppUser.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.status(200).redirect('/login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};