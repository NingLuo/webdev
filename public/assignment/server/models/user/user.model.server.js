var mongoose = require("mongoose");

module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);  //instance of model is the documents of MongoDB

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function updateUser(userId, newUser) {
        userId = mongoose.Types.ObjectId(userId);
        delete newUser._id;
        return User.update({"_id": userId}, newUser);
    }

    function findUserByCredentials(credentials) {
        return User.findOne({"username": credentials.username, "password": credentials.password});
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({"username": username});
    }
};