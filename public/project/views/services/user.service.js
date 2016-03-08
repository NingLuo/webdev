(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("UserService", UserService);

    function UserService ($rootScope) {
        var users = [
            {u_id: 123, username: 'Alice', password: 'Alice', email: 'alice@gmail.com', favorites: [], rates: []},
            {u_id: 234,
                username: 'bob',
                password: 'bob',
                email: 'bob@gmail.com',
                favorites:['9e5768d1f4e86338b5b5e090f3053e15', 'd25c14971214c4327c7e2e1a28816d04', 'fac02cde4df48f46d9ba872d51c07a9c', '1d0fd3807fa4dc52692a0d475df93d6b'],
                rates: [{overall: '4 stars',
                        waitTime: '5 stars',
                        bedsideManner: '5 stars',
                        comments: 'He is a pretty decent doctor.'}]
            },
            {u_id: 456, username: 'jane', password: 'jane', email: 'jane@gmail.com', favorites: [], rates: []}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            addFavoriteByUid: addFavoriteByUid,
            addRate: addRate,
            findReviewsByUserId: findReviewsByUserId
        };

        return api;

        function findUserByCredentials (email, password, callback) {
            console.log(email + "Service " + password);
            for(var i=0; i < users.length; i++) {
               if (users[i].email === email && users[i].password === password) {
                   callback(users[i]);
                   return;
               }
            }
            callback(null);
        }

        function addFavoriteByUid (userId, uid) {
            for(var i=0; i<users.length; i++) {
                if(users[i].u_id === userId) {
                    users[i].favorites.push(uid);
                    return true;
                }
            }
            return false;
        }

        function addRate(userId, rate) {
            for(var i=0; i<users.length; i++) {
                if(users[i].u_id === userId) {
                    users[i].rates.push(rate);
                    return true;
                }
            }
            return false;
        }

        function findReviewsByUserId(u_id) {
            for(var i=0; i<users.length; i++) {
                if(users[i].u_id === u_id) {
                    return users[i].rates;
                }
            }
            return null;
        }
    }
})();