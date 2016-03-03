(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("UserService", UserService);

    function UserService ($rootScope) {
        var users = [
            {username: 'Alice', password: 'Alice', email: 'alice@gmail.com'},
            {username: 'bob', password: 'bob', email: 'bob@gmail.com'},
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