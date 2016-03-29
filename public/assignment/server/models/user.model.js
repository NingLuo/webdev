var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser, //done
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
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

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for(var i in mock) {
            if(mock[i]._id == userId){
                return mock[i];
            }
        }
        return null;
    }

    function updateUser(userId, new_user) {
        var user = findUserById(userId);
        if(user) {
            user._id = new_user._id;
            user.firstName = new_user.firstName;
            user.lastName = new_user.lastName;
            user.username = new_user.username;
            user.password = new_user.password;
        }
        return user;
    }

    function deleteUser(userId) {
        for(var i in mock) {
            if(mock[i]._id == userId) {
                mock.splice(i, 1);
            }
        }
        return mock;
    }
}
