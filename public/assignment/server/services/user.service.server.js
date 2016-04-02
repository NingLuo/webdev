module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/login", findUserByCredentials); // 自己修改了一下,跟要求不一样
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function getUserByUsername(req, res) {
        var username =req.param.username;
        console.log("username");
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials({username: username, password: password})
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

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    req.session.currentUser = user; //注意不再是response.data了!
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
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
};