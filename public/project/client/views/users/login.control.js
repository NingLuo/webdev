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
                        if(!$rootScope.previousUrl){
                            //if $rootScope.previousUrl is null, which means the user was not redirected to login page from other pages,
                            // direct to profile page after login
                            $location.url('profile');
                        }
                        else {
                            //if $rootScope.previousUrl is not null, which means the user was redirected to login page from a previous url,
                            // then direct back to that page;
                            //the replace() is for using previousUrl to replace the last history url,(which is the login url), so that
                            //when user hit the back button it won't come back to login, instead, it stays at the same page(the previousUrl page).
                            $location.url($rootScope.previousUrl).replace();
                            $rootScope.previousUrl = null;
                        }
                    } else {
                        vm.userNotFound = true;
                    }
                });
            }
    }
})();