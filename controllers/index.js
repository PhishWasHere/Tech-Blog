const express = require('express');
const router = express.Router();

const routes = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const post = require('./routes/post');


router.route('/').get(routes.findAll);
router.route('/login').get(login.login);
router.route('/login').post(login.userLogin);

router.route('/signupPage').get(signup.signupPage); 
router.route('/signup').post(signup.signup);

router.route('/logout').get(logout.logout);

router.route('/dashboard').get(dashboard.dashboard);

router.route('/post').get(post.getPost);
router.route('/post').post(post.createPost);


module.exports = router;
