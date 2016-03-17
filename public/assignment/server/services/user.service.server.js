module.exports = function (app, model) {
    //var userModel = require("./../models/user.model.js");

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/login", getUserByCredentials); // 自己修改了一下,跟要求不一样
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function getUserByUsername(req, res) {
        var username =req.param.username;
        console.log("username");
    }

    function getUserByCredentials(req, res) {
        //var username = req.param('username');
        //var password = req.param('password');
        var username = req.query.username;
        var password = req.query.password;
        var user = model.findUserByCredentials({username: username, password: password});
        req.session.currentUser = user;
        console.log(user);
        res.json(user);
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
        var newUser = model.createUser(user);
        req.session.currentUser = newUser;
        res.json(newUser);
    }

    function getAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = model.findUserById(userId);
        res.json(user);
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var userId = req.params.id;
        var user = model.updateUser(userId, newUser);
        req.session.currentUser = user;
        res.send(200);
    }

    function deleteUser() {
        //to be implemented
    }
}