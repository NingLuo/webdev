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
            UserService.findUserByCredentials(user.username, user.password, loginSuccess);

            function loginSuccess(currentUser) {
                if (currentUser) {
                    $rootScope.currentUser = {
                        "_id": currentUser._id,
                        "firstName": currentUser.firstName,
                        "lastName": currentUser.lastName,
                        "username": currentUser.username,
                        "password": currentUser.password,
                        "roles": currentUser.roles
                    };

                    $location.path('profile');
                } else {
                    $scope.noMatchUser = true;
                }
            }
        }
    }
})();