
exports.logout = async (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });


    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};
 