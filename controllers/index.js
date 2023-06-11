//dependencies
const express = require('express');
const router = express.Router();
const logInVali = require('../utils/loginVal'); //login validation middleware

//controllers
const routes = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const post = require('./routes/post');
const comment = require('./routes/comment');


//routes
router.route('/').get(routes.findAll); //find all posts

router.route('/login').get(login.login); //login page
router.route('/login').post(login.userLogin); //login post

router.route('/signup').get(signup.signupPage); //signup page
router.route('/signup').post(signup.signup); //signup post

router.route('/logout').get(logout.logout); //logout

router.route('/profile').get(profile.profile); //profile page
router.route('/profile/:id').get(profile.profile); //profile page via id

router.route('/post').get(post.getPost); //post page
router.route('/post/:id').get(post.getPost); //post page via id
router.route('/newpost').get(post.newPost); //new post page
router.route('/newpost').post(logInVali, post.createPost); //new post post
router.route('/deletepost/:id').post(logInVali, post.deletePost); //delete post
router.route('/edit/:id').get(logInVali, post.editPostHBS); //edit post page
router.route('/edit/:id').put(logInVali, post.editPost); //edit post put

router.route('/newcomment/:id').post(logInVali, comment.createComment); //new comment post

module.exports = router;
