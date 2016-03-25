var userMock = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateProfile: updateProfile,
        findUserById: findUserById
    };
    return api;

    function findUserByCredentials(credentials) {
        for(var i in userMock) {
            if(userMock[i].email === credentials.email && userMock[i].password === credentials.password) {
                return userMock[i];
            }
        }
        return null;
    }

    function createUser(newUser) {
        newUser._id = uuid.v4();
        userMock.push(newUser);
        return newUser;
    }

    function updateProfile(profile) {
        var user = findUserById(profile.userId);
        user.username = profile.username;
        user.email = profile.email;
        user.password = user.password;

        return user;
    }

    function findUserById(id) {
        for(var i in userMock) {
            if(userMock[i].u_id === id) {
                return userMock[i];
            }
        }
        return null;
    }
};
