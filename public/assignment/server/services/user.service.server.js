module.exports = function (app) {
    var userModel = require("./../models/user.model.js");

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.put("PUT /api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

}