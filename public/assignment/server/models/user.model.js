var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
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
        return moke;
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
            user = {
                "_id": new_user._id,
                "firstName": new_user.firstName,
                "lastName": new_user.lastName,
                "username": new_user.username,
                "password": new_user.password
            }
        }
    }

    function deleteUser(userId) {
        for(var i in mock) {
            if(mock[i]._id == userId) {
                mock.splice(i, 1);
            }
        }
    }
}
