module.exports = function (app, UserModel) {
    app.get('/api/user/login', findUserByCreDentials);
    app.post("/api/user/register", register);

    function findUserByCreDentials(req, res) {
        var credentials = {};
        credentials.email = req.query.email;
        credentials.password = req.query.password;
        //console.log("server: " + email + " " + password);
        var user = UserModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function register(req, res) {
        var newUser = req.body;
        var user = UserModel.createUser(newUser);
        req.session.currentUser = user;
        res.json(user);
    }
};
