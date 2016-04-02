var mongoose = require("mongoose");

module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);  //instance of model is the documents of MongoDB

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function updateUser(userId, user) {
        return User.update({"_id": userId}, user);
    }

    function findUserByCredentials(credentials) {
        return User.findOne({"username": credentials.username, "password": credentials.password});
    }

    function findUserById(userId) {
        return User.findUserById(userId);
    }
};