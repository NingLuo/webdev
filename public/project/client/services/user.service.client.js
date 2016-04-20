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
            removeMsg: removeMsg,
            setCurrentUser: setCurrentUser,
            saveMyMsg: saveMyMsg
        };

        return api;

        function findUserByCredentials (credentials) {
            return $http.get('/api/user/login?username=' + credentials.username + '&password=' + credentials.password);
        }

        function register(newUser) {
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
        function sendMsgTo(targetUserId, newMessage) {
            return $http.post("/api/user/" + targetUserId + "/message", newMessage);
        }

        function removeMsg(userId, msgId) {
            return $http.delete("/api/user/" + userId + "/message/" + msgId);
        }

        function saveMyMsg(myUserId, messageId, newMessage) {
            return $http.put("/api/user/" + myUserId + "/message/" + messageId, newMessage);
        }
    }
})();