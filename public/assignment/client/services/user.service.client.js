(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            register: register,
            createUser: createUser,
            removeUserById: removeUserById,
            adminUpdateUser: adminUpdateUser,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };

        return api;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
        
        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function register(user) {
            return $http.post("/api/assignment/user", user);
        }

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function removeUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function adminUpdateUser(userId, newUser) {
            return $http.put("/api/assignment/admin/user/" + userId, newUser);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();