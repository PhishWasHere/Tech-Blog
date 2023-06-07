

const {Post} = require('../../models');

exports.findAll = async (req, res) => {
    try {
        const data = await Post.findAll({
        });

        const posts = data.map((post) => post.get({ plain: true }));

        res.status(200).render('homepage', {
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};
