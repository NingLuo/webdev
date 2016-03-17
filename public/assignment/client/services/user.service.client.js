(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
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
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };

        return api;


        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/login?username=" + credentials.username + "&password=" + credentials.password);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log("current user is: " + $rootScope.currentUser);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
        
        function findAllUsers(callback) {

        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
            //user._id = (new Date).getTime();
            //users.push(user);
            //callback(user);
        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
            //for(var i = 0; i < users.length; i++) {
            //    if(users[i]._id === userId) {
            //        users[i].username = user.username;
            //        users[i].password = user.password;
            //        users[i].firstName = user.firstName;
            //        users[i].lastName = user.lastName;
            //        users[i].email = user.email;
            //        callback(users[i]);
            //    }
            //}
        }
    }
})();