const express = require('express');
const router = express.Router();
const logInVali = require('../utils/loginVal');


const routes = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const post = require('./routes/post');
const comment = require('./routes/comment');


router.route('/').get(routes.findAll);

router.route('/login').get(login.login);
router.route('/login').post(login.userLogin);

router.route('/signup').get(signup.signupPage); 
router.route('/signup').post(signup.signup);

router.route('/logout').get(logout.logout);

router.route('/profile').get(profile.profile);
router.route('/profile/:id').get(profile.profile);

router.route('/post').get(post.getPost);
router.route('/post/:id').get(post.getPost);
router.route('/newpost').get(post.newPost);
router.route('/newpost').post(logInVali, post.createPost);
router.route('/deletepost/:id').post(logInVali, post.deletePost);
router.route('/edit/:id').get(logInVali, post.editPostHBS);
router.route('/edit/:id').put(logInVali, post.editPost);

router.route('/newcomment/:id').post(logInVali, comment.createComment);

module.exports = router;
