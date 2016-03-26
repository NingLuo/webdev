module.exports = function (app, UserModel) {
    app.get('/api/user/login', findUserByCreDentials);
    app.post("/api/user/register", register);
    app.get("/api/user/loggedIn", getLoggedInUser);
    app.put("/api/user/profile", updateProfile);
    app.get("/api/user/logout", logout);
    app.get("/api/user/:userId/favorite/:doctorUid", addFavoriteByUid);
    app.post("/api/user/:userId/rate/", addRateByUid);
    app.get("/api/user/:userId/rates", findRatesByUserId);
    app.put("/api/user/:userId/rate", updateRate);
    app.delete("/api/user/:userId/rate/:rateId", deleteRate);

    function findUserByCreDentials(req, res) {
        var credentials = {};
        credentials.email = req.query.email;
        credentials.password = req.query.password;
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

    function getLoggedInUser(req, res) {
        res.json(req.session.currentUser);
    }

    function updateProfile(req, res) {
        var profile = req.body;
        var user = UserModel.updateProfile(profile);
        req.session.currentUser = user;
        res.json(user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function addFavoriteByUid(req, res) {
        var userId = req.params.userId;
        var doctorUid = req.params.doctorUid;
        var user = UserModel.addFavoriteByUid(userId, doctorUid);
        req.session.currentUser = user;
        res.send(200);
    }

    function addRateByUid(req, res) {
        var userId = req.params.userId;
        var rate = req.body;
        var user = UserModel.addRateByUid(userId, rate);
        req.session.currentUser = user;
        res.send(200);
    }

    function findRatesByUserId(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        var rates = UserModel.findRatesByUserId(userId);
        console.log(rates);
        res.json(rates);
    }

    function updateRate(req, res) {
        var userId = req.params.userId;
        var rate = req.body;
        UserModel.updateRate(userId, rate);
        res.send(200);
    }

    function deleteRate(req, res) {
        var userId = req.params.userId;
        var rateId = req.params.rateId;
        var rates = UserModel.deleteRate(userId, rateId);
        res.json(rates);
    }
};
