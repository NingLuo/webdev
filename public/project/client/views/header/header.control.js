(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, UserService) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                   $rootScope.currentUser = null;
                });
        }
    }
})();