const {AppUser} = require('../../models');



exports.login = (req, res) => {
    try {

        if (req.session.logged_in) {
            res.status(303).redirect('/profile'); // 303 See Other, i think
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
            res.redirect('/profile');
            return;
        }

        const userData = await AppUser.findOne({
        where: {
            username: req.body.username,
            },
        });

        if (!userData) {
            res.status(500).json({ message: 'email or password incorrect' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(500).json({ message: 'email or password incorrect' });
            return;
        }
            console.log('user val' , userData.id);
        req.session.save(() => {
            req.session.user = {};
            req.session.user.id = userData.id;
            req.session.loggedIn = true;
            res.status(200).redirect('/');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


