var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("Project_User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser
    };
    return api;

    function createUser(newUser) {
        return User.create(newUser);
    }

    function findUserByCredentials(credentials) {
        return User.findOne({email: credentials.email, password: credentials.password});
    }

    function updateUser(newUser) {
        var userId = mongoose.Types.ObjectId(newUser._id);
        delete newUser._id;
        return User.update({"_id": userId}, newUser);
    }
};
