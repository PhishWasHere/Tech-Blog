const {User} = require('../../models');



exports.login = (req, res) => {
    try {

        if (req.session.logged_in) {
            res.status(303).redirect('/dashboard'); // 303 See Other, i think
            return;
        }

        res.status(200).render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.userLogin =  async (req, res) => {
    try {

        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }

        const userData = await User.findOne({
        where: {
            email: req.body.email,
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
            
        req.session.save(() => {
            req.session.user = {};
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).redirect('/');
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


