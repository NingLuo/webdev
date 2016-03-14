(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(credentials) {
            console.log(credentials.username + " " + credentials.password + "from client service");
            return $http.get("/api/assignment/login?username=" + credentials.username + "&password=" + credentials.password);

            //for(var i = 0; i < users.length; i++) {
            //    if(users[i].username === username && users[i].password === password) {
            //        console.log(username + " found!");
            //        callback(users[i]);
            //        return;
            //    }
            //}
            //callback(null);
        }

        function findAllUsers(callback) {

        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id === userId) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    callback(users[i]);
                }
            }
        }
    }
})();