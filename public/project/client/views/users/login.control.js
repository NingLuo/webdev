(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("LoginCtrl", LoginCtrl);

    function LoginCtrl (UserService, $rootScope, $location) {
        var vm = this;

        vm.login = login;
        vm.userNotFound = false;

        function login (user) {
            console.log(user.email + " " + user.password);
            UserService.findUserByCredentials(user.email, user.password, callback);

            function callback (callbackUser) {
                if (callbackUser) {
                    $rootScope.currentUser = callbackUser;
                    $location.url('profile');
                } else {
                    console.log("not success");
                    vm.userNotFound = true;
                }
            }
        }
    }
})();