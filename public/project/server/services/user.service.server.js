var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, UserModel) {
    //The get() method allows you to map a url to an executable
    app.post('/api/user/login', passport.authenticate('local'), login);
    app.post("/api/user/register", register);
    app.get("/api/user/loggedIn", getLoggedInUser);
    app.put("/api/user/profile", updateUser);
    app.get("/api/user/logout", logout);
    app.get("/api/user/:userId/favorite/:doctorUid", addFavoriteByUid);
    app.delete("/api/user/:userId/favorite/:doctorUid", unfavorite);
    //app.post("/api/user/:userId/rate/", addRateByUid);
    app.put("/api/user/:userId/review/:reviewId", addReview);
    app.delete("/api/user/:userId/review/:reviewId", deleteReview);
    app.get("/api/user/:userId/rates", findRatesByUserId);
    app.put("/api/user/:userId/rate", updateRate);
    app.delete("/api/user/:userId/rate/:rateId", deleteRate);
    app.get("/api/user/:userId/message", findMessageByUserId);
    app.post("/api/user/:targetUserId/message", sendMsgTo);
    app.delete("/api/user/:userId/message/:msgId", removeMsg);
    app.put("/api/user/:myUserId/message/:messageId", saveMyMsg);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials({'username': username, 'password': password})
            .then(
                function (user) {
                    if(!user) {
                        return done(null, false, {message: "Incorrect username or password"});
                    }
                    return done(null, user);
                },
                function (err) {
                    return done(err);
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user._id);
    }

    function deserializeUser(id, done) {
        UserModel
            .findUserById(id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var newUser = req.body;
        if(newUser.role == null) {
            newUser.role = "Patient";
        }
        //needs to check if username already exists or if doctorId already exists
        // add your code here
        UserModel
            .createUser(newUser)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function getLoggedInUser(req, res) {
        var user = req.isAuthenticated()? req.user : null;
        res.send(user);
    }

    function updateUser(req, res) {
        var newUser = req.body;
        UserModel
            .updateUser(newUser)
            .then(
                function (response) {
                    req.session.currentUser = newUser;
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function addFavoriteByUid(req, res) {
        var userId = req.params.userId;
        var doctorUid = req.params.doctorUid;
        UserModel
            .addFavoriteByUid(userId, doctorUid)
            .then(
                function (response) {
                    //if the response is not "You have alreay liked this doctor before!" string but the user object, then added it to session
                    if(typeof response != "string") req.session.currentUser = response;
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function unfavorite(req, res) {
        var userId = req.params.userId;
        var doctorUid = req.params.doctorUid;
        UserModel
            .unfavorite(userId, doctorUid)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.send(user);
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var reviewId = req.params.reviewId;
        UserModel
            .addReview(userId, reviewId)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function deleteReview(req, res) {
        var userId = req.params.userId;
        var reviewId = req.params.reviewId;
        UserModel
            .deleteReview(userId, reviewId)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                }
            );
    }
    //function addRateByUid(req, res) {
    //    var userId = req.params.userId;
    //    var rate = req.body;
    //    var user = UserModel.addRateByUid(userId, rate);
    //    req.session.currentUser = user;
    //    res.send(200);
    //}

    function findRatesByUserId(req, res) {
        var userId = req.params.userId;
        var rates = UserModel.findRatesByUserId(userId);
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

    function findMessageByUserId(req, res) {
        var userId = req.params.userId;
        UserModel
            .findMessageByUserId(userId)
            .then(
                function (messages) {
                    res.json(messages);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    //new
    function sendMsgTo(req, res) {
        var targetUserId = req.params.targetUserId;
        var newMessage = req.body;
        UserModel
            .sendMsgTo(targetUserId, newMessage)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    res.send(err);
                }
            );

    }

    function removeMsg(req, res) {
        var userId = req.params.userId;
        var msgId = req.params.msgId;
        UserModel
            .removeMsg(userId, msgId)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function saveMyMsg(req, res) {
        var myUserId = req.params.myUserId;
        var messageId = req.params.messageId;
        var newMessage = req.body;
        console.log(myUserId, "server")
        console.log(messageId, "server")
        console.log(newMessage, "server")
        UserModel
            .saveMyMsg(myUserId, messageId, newMessage)
            .then(
                function (response) {
                    console.log(response);
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};
