var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser
    };
    return api;

    function findUserByUsername(username) {
        for(var i in mock) {
            if(mock[i].username == username ) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var i in mock) {
            if(mock[i].username==credentials.username && mock[i].password == credentials.password) {
                return mock[i];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date).getTime();
        mock.push(user);
        return user;
    }
}
