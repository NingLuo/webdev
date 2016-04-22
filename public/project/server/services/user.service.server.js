var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, UserModel) {
    var auth = authorized;
    app.post('/api/user/login', passport.authenticate('local'), login);
    app.get("/api/user/logout", logout);
    app.get("/api/user/loggedIn", getLoggedInUser);
    app.post("/api/user/register", register);
    app.put("/api/user/profile", auth, updateUser);
    app.post("/api/user/:userId/favorite/:doctorUid", auth, addFavoriteByUid);
    app.get("/api/user/:userId/favorite/:doctorUid", auth, checkFavorite);
    app.delete("/api/user/:userId/favorite/:doctorUid", auth, unfavorite);
    app.put("/api/user/:userId/review/:reviewId", auth, addReview);
    app.delete("/api/user/:userId/review/:reviewId", auth, deleteReview);
    app.get("/api/user/:userId/message", auth, findMessageByUserId);
    app.post("/api/user/:targetUserId/message", auth, sendMsgTo);
    app.delete("/api/user/:userId/message/:msgId", auth, removeMsg);
    app.put("/api/user/:myUserId/message/:messageId", auth, saveMyMsg);

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

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        }
        else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function getLoggedInUser(req, res) {
        var user = req.isAuthenticated()? req.user : null;
        res.send(user);
    }

    function register(req, res) {
        var newUser = req.body;
        if(newUser.role == null) {
            newUser.role = "Patient";
        }
        //Check if username already exists
        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if(!user) {
                        return UserModel.createUser(newUser)
                    } else {
                        //if user name exists, return null
                        res.json(null);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    //login user after successful registration
                    req.login(user, function(err){
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    })
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var newUser = req.body;
        UserModel
            .updateUser(newUser)
            .then(
                function (response) {
                    //req.session.currentUser = newUser;
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
                    res.status(400).send(err);
                }
            );
    }

    function checkFavorite(req, res) {
        var userId = req.params.userId;
        var doctorUid = req.params.doctorUid;
        UserModel
            .checkFavorite(userId, doctorUid)
            .then(
                function (user) {
                    if(user) {
                        res.send(200);
                    }
                    else {
                        res.json(null);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
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
                    res.status(400).send(err);
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
                    res.status(400).send(err);
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
                    res.status(400).send(err);
                }
            );
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
                    res.status(400).send(err);
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

        UserModel
            .saveMyMsg(myUserId, messageId, newMessage)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};
