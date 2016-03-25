var userMock = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser
    };
    return api;

    function findUserByCredentials(credentials) {
        console.log("findUserByCredentials from user model");
        for(var i in userMock) {
            if(userMock[i].email === credentials.email && userMock[i].password === credentials.password) {
                return userMock[i];
            }
        }
        return null;
    }

    function createUser(newUser) {
        newUser._id = uuid.v4();
        userMock.push(newUser)
        return newUser;
    }
};
