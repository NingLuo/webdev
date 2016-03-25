(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ProfileCtrl", ProfileCtrl);

    function ProfileCtrl($rootScope, $location, UserService) {
        var vm = this;
        vm.currentUser = {}; //if vm.currentUser = null, system will report error --> can not set u_id of null value on line 23
        vm.updateProfile = updateProfile;
        vm.cancelUpdate = cancelUpdate;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                        //copy currentUser's profile data into local vm.currentUser so that the profile on server
                        //or in $rootscoop.currentUser won't change until the user click update button
                        vm.currentUser.u_id = currentUser.u_id;
                        vm.currentUser.username = currentUser.username;
                        vm.currentUser.email = currentUser.email;
                        vm.currentUser.password = currentUser.password;
                    }
                    else {
                        $location.url('/login');
                    }
                });
        }
        init();

        function updateProfile() {
            var profile = {
                userId: vm.currentUser.u_id,
                username: vm.currentUser.username,
                email: vm.currentUser.email,
                password: vm.currentUser.password
            };
            UserService
                .updateProfile(profile)
                .then(function (response) {
                    $rootScope.currentUser = response.data;
                });
        }

        function cancelUpdate() {
            //reset vm.currenUser value
            vm.currentUser.u_id = $rootScope.currentUser.u_id;
            vm.currentUser.username = $rootScope.currentUser.username;
            vm.currentUser.email = $rootScope.currentUser.email;
            vm.currentUser.password = $rootScope.currentUser.password;
        }
    }
})();