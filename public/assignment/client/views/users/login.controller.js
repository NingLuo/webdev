(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        //////////////////////////

        function login(user) {
            $scope.noMatchUser = false;
            console.log("login start")
            UserService.findUserByCredentials({
                username: user.username,
                password: user.password
            });



            function loginSuccess(currentUser) {
                console.log("login success");
                if (currentUser) {
                    $rootScope.currentUser = {
                        "_id": currentUser._id,
                        "firstName": currentUser.firstName,
                        "lastName": currentUser.lastName,
                        "username": currentUser.username,
                        "password": currentUser.password,
                        "roles": currentUser.roles
                    };
                    $location.url('/profile');
                } else {
                    $scope.noMatchUser = true;
                }
            }
        }
    }
})();