(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RegisterCtrl", RegisterCtrl);

    function RegisterCtrl(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(newuser) {
            UserService
                .register(newuser)
                .then(function (response) {
                    $rootScope.currentUser = response.data;
                    $location.url("/profile");
                })
        }
    }
})();