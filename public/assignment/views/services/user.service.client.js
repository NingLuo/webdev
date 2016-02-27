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
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == username && users[i].password == password) {
                    console.log(username + " found!");
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
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

            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
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