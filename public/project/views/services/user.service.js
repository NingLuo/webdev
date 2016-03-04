(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("UserService", UserService);

    function UserService ($rootScope) {
        var users = [
            {username: 'Alice', password: 'Alice', email: 'alice@gmail.com', favorites: []},
            {username: 'bob', password: 'bob', email: 'bob@gmail.com', favorites:['9e5768d1f4e86338b5b5e090f3053e15', 'd25c14971214c4327c7e2e1a28816d04', 'fac02cde4df48f46d9ba872d51c07a9c', '1d0fd3807fa4dc52692a0d475df93d6b']},
            {username: 'jane', password: 'jane', email: 'jane@gmail.com'}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials
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
    }
})();