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
            UserService
                .findUserByCredentials({"email": user.email, "password": user.password})
                .then(function (response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url('profile');
                    } else {
                        console.log("not success");
                        vm.userNotFound = true;
                    }
                });
            }
    }
})();