(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
        }
    }
})();