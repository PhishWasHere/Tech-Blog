const {Comment, User, Post } = require('../../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
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
});