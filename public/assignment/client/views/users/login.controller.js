(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        function login(user) {
            if(!user) {
                return
            }
            $scope.noMatchUser = false;
            UserService
                .findUserByCredentials(user)
                .then(function (response) {
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    } else {
                        $scope.noMatchUser = true;
                    }
                });
        }
    }
})();