(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

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
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;



        function findUserByCredentials(username, password, callback) {
            for(var i = 0; i < currentUsers.length; i++) {
                if(currentUsers[i].username == username && currentUsers[i].password == password) {
                    console.log(username + " found!");
                    callback(currentUsers[i]);
                } else {
                    callback(null);
                }
            }
        }

        function findAllUsers(callback) {

        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            console.log(users[users.length-1]);
            callback(user);
        }

        function deleteUserById(userId, callback) {

        }

        function updateUser(userId, user, callback) {

        }

    }
})();