var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByUsername(username) {

    }

    function findUserByCredentials(credentials) {

    }
}
