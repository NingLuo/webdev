(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location, $scope) {
        var vm = this;

        function init() {
            //vm.currentUser = UserService.getCurrentUser();
        }
        init();


        //$scope.currentUser = {
        //    _id: $rootScope.currentUser._id,
        //    username: $rootScope.currentUser.username,
        //    password: $rootScope.currentUser.password,
        //    firstName: $rootScope.currentUser.firstName,
        //    lastName: $rootScope.currentUser.lastName,
        //    email: $rootScope.currentUser.email
        //};

        vm.update = update;

        function update() {
            UserService.updateUser(vm.currentUser._id, vm.currentUser, callback);
            function callback(updatedUser) {
                $rootScope.currentUser = updatedUser;
            }
        }
    }
})();