(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, UserService, $location) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;

        function login() {
            $rootScope.previousUrl = $location.path();
            $location.url('/login');
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                   $rootScope.currentUser = null;
                });
        }
    }
})();