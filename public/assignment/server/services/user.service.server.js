var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {
    var auth = authorized;
    var isAdmin = isAdmin;
    app.post("/api/assignment/user",            register);
    app.get("/api/assignment/admin/user",  isAdmin, findAllUsers);
    app.post("/api/assignment/admin/user", isAdmin, createUser);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, removeUserById);
    app.put("/api/assignment/admin/user/:userId", isAdmin, adminUpdateUser);
    app.get("/api/assignment/user/:id",         findUserById);
    app.post("/api/assignment/login", passport.authenticate('local'), login); // 自己修改了一下,跟要求不一样
    app.get("/api/assignment/loggedin",         loggedin);
    app.post("/api/assignment/logout",          logout);
    app.put("/api/assignment/user/:id", auth, updateUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password:password})
            .then(
                function (user) {
                    if(!user) { return done(null, false, {message: 'Incorrect username or password'});}
                    return done(null, user);
                },
                function (err) {
                    return done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
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

    function loggedin(req, res) {
        res.send(req.isAuthenticated()? req.user : null);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        if(newUser.username == 'admin'){
            newUser.roles = ["student", "admin"];
        } else {
            newUser.roles = ["student"];
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if(!user) {
                        return userModel.createUser(newUser);
                    } else {
                        res.json(null);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
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
            )
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if(!user) {
                        return userModel.createUser(newUser);
                    } else {
                        res.json(null);
                    }
                },
                function (err) {
                    res.status(403).send(err);
                }
            )
            .then(
                function (user) {
                    console.log("createUser");
                    console.log(user);
                    res.json(user);
                },
                function (err) {
                    res.status(403).send(err);
                }
            )
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function removeUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .removeUserById(userId)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function adminUpdateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var newUser = req.body;
        //check if type of phonse is string then split it into an array of strings
        //if it's not a string but an array of string(which means it hasn't been modified at client side), then do nothing
        if(typeof newUser.phones == "string") {
            newUser.phones = newUser.phones.split(",");
        }
        if(typeof newUser.emails == "string") {
            newUser.emails = newUser.emails.split(",");
        }
        var userId = req.params.id;
        userModel
            .updateUser(userId, newUser)
            .then(
                function () {
                    req.session.currentUser = newUser;
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if(req.isAuthenticated) {
            if(req.user.roles.indexOf("admin") > 0) {
                next();
            } else {
                res.send(403);
            }
        } else {
            res.send(401);
        }
    }
};