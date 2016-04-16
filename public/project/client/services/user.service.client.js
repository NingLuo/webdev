(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("UserService", UserService);

    function UserService ($rootScope, DoctorSearchService, $http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            register: register,
            addFavoriteByUid: addFavoriteByUid,
            unfavorite: unfavorite,
            addReview: addReview,
            deleteReview: deleteReview,
            findMessagesByUserId: findMessagesByUserId,
            sendMsgTo: sendMsgTo,
            getLoggedInUser:getLoggedInUser,
            updateUser: updateUser,
            logout: logout,
            deleteMsg: deleteMsg,
            setCurrentUser: setCurrentUser
        };

        return api;

        function findUserByCredentials (credentials) {
            return $http.get('/api/user/login?email=' + credentials.email + '&password=' + credentials.password);
        }

        function register(newUser) {
            console.log("create user from user service");
            return $http.post("/api/user/register", newUser);
        }

        function getLoggedInUser() {
            return $http.get("/api/user/loggedIn");
        }


        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function updateUser(newUser) {
            return $http.put("/api/user/profile", newUser);
        }

        function logout() {
            return $http.get("/api/user/logout");
        }

        function addFavoriteByUid (userId, doctorUid) {
            return $http.get("/api/user/" + userId + "/favorite/" + doctorUid);
        }
        //new
        function unfavorite(userId, doctorUid) {
            return $http.delete("/api/user/" + userId + "/favorite/" + doctorUid);
        }

        function addReview(userId, reviewId) {
            return $http.put("/api/user/" + userId +"/review/" + reviewId);
        }

        function deleteReview(userId, reviewId) {
            return $http.delete("/api/user/"+ userId + "/review/" + reviewId);
        }

        function findMessagesByUserId(userId) {
            return $http.get("/api/user/" + userId +"/message");
        }

        //new
        function sendMsgTo(receiverId, msgToSend) {
            return $http.post("/api/user/" + receiverId + "/message", msgToSend);
        }

        function deleteMsg(userId, msgId) {
            return $http.delete("/api/user/" + userId + "/message/" + msgId);
        }

    }
})();