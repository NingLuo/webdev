(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("UserService", UserService);

    function UserService ($rootScope, DoctorSearchService, $http) {
        var users = [
            {u_id: 123, username: 'Alice', password: 'Alice', email: 'alice@gmail.com', favorites: [], rates: [], messages: []},
            {u_id: 234,
                username: 'bob',
                password: 'bob',
                email: 'bob@gmail.com',
                favorites:['9e5768d1f4e86338b5b5e090f3053e15', 'd25c14971214c4327c7e2e1a28816d04', 'fac02cde4df48f46d9ba872d51c07a9c', '1d0fd3807fa4dc52692a0d475df93d6b'],
                rates: [{
                    id: '1',
                    doctorId:'9e5768d1f4e86338b5b5e090f3053e15',
                    doctorName: 'Susan Day',
                    reviewDate: 'Dec. 12 2015',
                    overall: '4 stars',
                    waitTime: '5 stars',
                    bedsideManner: '5 stars',
                    comments: 'She is a pretty decent doctor.'}],
                messages: [
                    {
                        from: 'Alice',
                        date: 'Mar. 1 2016',
                        content: 'Hi, can I ask you a few questions?'
                    },
                    {
                        from: 'jane',
                        date: 'Mar. 2 2016',
                        content: 'Nice to meet you, this is jane.'
                    }
                ]
            },
            {u_id: 456, username: 'jane', password: 'jane', email: 'jane@gmail.com', favorites: [], rates: [], messages: []}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            register: register,
            addFavoriteByUid: addFavoriteByUid,
            addRateByUid: addRateByUid,
            findReviewsByUserId: findReviewsByUserId,
            findMessagesByUserId: findMessagesByUserId,
            sendMsgTo: sendMsgTo,
            updateReview: updateReview,
            getLoggedInUser:getLoggedInUser,
            updateProfile: updateProfile,
            logout: logout,
            deleteReview: deleteReview
        };

        return api;

        function findUserByCredentials (credentials) {
            console.log(credentials.email + " Service " + credentials.password);
            return $http.get('/api/user/login?email=' + credentials.email + '&password=' + credentials.password);
            //for(var i=0; i < users.length; i++) {
            //   if (users[i].email === email && users[i].password === password) {
            //       callback(users[i]);
            //       return;
            //   }
            //}
            //callback(null);
        }

        function register(newUser) {
            console.log("create user from user service");
            return $http.post("/api/user/register", newUser);
        }

        function getLoggedInUser() {
            return $http.get("/api/user/loggedIn");
        }

        function updateProfile(profile) {
            return $http.put("/api/user/profile", profile);
        }

        function logout() {
            return $http.get("/api/user/logout");
        }

        function addFavoriteByUid (userId, doctorUid) {
            return $http.get("/api/user/" + userId + "/favorite/" + doctorUid);
        }

        function addRateByUid(userId, rate) {
            return $http.post("/api/user/" + userId + "/rate/", rate);
        }

        function findReviewsByUserId(userId) {
            return $http.get("/api/user/" + userId + "/rates");
            //for(var i=0; i<users.length; i++) {
            //    if(users[i].u_id === u_id) {
            //        //DoctorSearchService.findDoctorByUid(users[i].rates.doctorId);
            //        return users[i].rates;
            //    }
            //}
            //return null;
        }

        function findMessagesByUserId(u_id) {
            for(var i=0; i<users.length; i++) {
                if(users[i].u_id === u_id) {
                    //DoctorSearchService.findDoctorByUid(users[i].rates.doctorId);
                    return users[i].messages;
                }
            }
            return null;
        }

        function sendMsgTo(msgToSend) {
            console.log(msgToSend.from);
            for(var i=0; i<users.length; i++) {
                if(users[i].username === msgToSend.receiver) {
                    users[i].messages.push(msgToSend);
                }
            }
        }

        function updateReview(userId, rate) {
            return $http.put("/api/user/" + userId + "/rate", rate);
        }

        function deleteReview(userId, rateId) {
            return $http.delete("/api/user/" + userId + "/rate/" + rateId);
        }
    }
})();