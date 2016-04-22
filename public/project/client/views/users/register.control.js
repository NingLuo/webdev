(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RegisterCtrl", RegisterCtrl);

    function RegisterCtrl(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.registerFailed = false;
        vm.pwdMatchFailed = false;

        function register(newuser, confirmPassword) {
            if(newuser.password === confirmPassword && newuser.password != null) {
                UserService
                    .register(newuser)
                    .then(
                        function (response) {
                            if(response.data) {
                                $rootScope.currentUser = response.data;
                                $location.url("/profile");
                            }
                            else {
                                vm.registerFailed = true;
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            }
            else {
                vm.pwdMatchFailed = true;
            }
        }
    }
})();