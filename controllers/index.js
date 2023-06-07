const express = require('express');
const router = express.Router();

const routes = require('./routes');


router.route('/').get(routes.findAll);
router.route('/login').post(routes.userLogin);
router.route('/login').get(routes.login);

router.route('/signupPage').get(routes.userSignup); 
router.route('/signup').post(routes.signup);

router.route('/logout').get(routes.logout);

router.route('/dashboard').get(routes.dashboard);

router.route('/post').get(routes.getPost);
router.route('/post').post(routes.createPost);

module.exports = router;
