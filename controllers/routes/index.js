

const {Post, AppUser} = require('../../models');

exports.findAll = async (req, res) => { // finds all post's and renders them to the homepage
    try {

        const data = await Post.findAll({
            include: [
                {
                    model: AppUser,
                },
            ],
        });

        const post = data.map((post) => post.get({ plain: true }));

        res.status(200).render('homepage', {
            post,
            loggedIn: req.session.loggedIn, //pass in the session variable so the {{#if loggedIn}} handlebars works
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
