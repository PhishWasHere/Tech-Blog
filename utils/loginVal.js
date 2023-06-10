
logInVali = (req, res, next) => {
    if(!req.session.loggedIn){
        res.status(303).redirect('/login');
        return;
    }
    next();
};

module.exports = logInVali;