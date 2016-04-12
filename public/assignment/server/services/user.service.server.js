var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, userModel) {
    var auth = authorized;
    app.post("/api/assignment/user",            register);
    app.get("/api/assignment/admin/user",  auth, findAllUsers);
    app.get("/api/assignment/user/:id",         findUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.post("/api/assignment/login", passport.authenticate('local'), login); // 自己修改了一下,跟要求不一样
    app.get("/api/assignment/loggedin",         loggedin);
    app.post("/api/assignment/logout",          logout);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function getUserByUsername(req, res) {
        var username =req.param.username;
        console.log("username");
    }

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

    //function findUserByCredentials(req, res) {
    //    var username = req.query.username;
    //    var password = req.query.password;
    //    userModel
    //        .findUserByCredentials({username: username, password: password})
    //        .then(
    //            function (user) {
    //                req.session.currentUser = user;
    //                res.json(user);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

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

    //function createUser(req, res) {
    //    var user = req.body;
    //    userModel
    //        .createUser(user)
    //        .then(
    //            function (user) {
    //                req.session.currentUser = user; //注意不再是response.data了!
    //                res.json(user);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
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

    function deleteUser(req, res) {
        var userId = req.params.id;
        var restUsers = model.deleteUser(userId);
        res.json(restUsers);
    }

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) { return true; }
        return false;
    }
};