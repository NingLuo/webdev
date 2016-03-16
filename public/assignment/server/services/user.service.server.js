module.exports = function (app, model) {
    //var userModel = require("./../models/user.model.js");

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/login", findUserByCredentials); // 自己修改了一下,跟要求不一样
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function findUserByUsername(req, res) {
        var username =req.param.username;
        console.log("username");
    }

    function findUserByCredentials(req, res) {
        //var username = req.param('username');
        //var password = req.param('password');
        var username = req.query.username;
        var password = req.query.password;
        var user = model.findUserByCredentials({username: username, password: password});
        res.json(user);
    }

    function createUser(req, res) {
        var user = req.body;
        var newUser = model.createUser(user);
        res.send(newUser);
    }

    function getAllUsers() {
        console.log("get all users from server");
    }

    function findUserById() {
        
    }

    function updateUser() {
        
    }

    function deleteUser() {
        
    }
}