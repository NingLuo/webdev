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
                    vm.currentUser = response.data;
                });
        }
        init();

        function updateProfile() {
            UserService
                .updateUser(vm.currentUser)
                .then(
                    function () {
                        $rootScope.currentUser = vm.currentUser;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function cancelUpdate() {
            //reset vm.currenUser value
            vm.currentUser._id = $rootScope.currentUser._id;
            vm.currentUser.username = $rootScope.currentUser.username;
            vm.currentUser.email = $rootScope.currentUser.email;
            vm.currentUser.password = $rootScope.currentUser.password;
        }
    }
})();