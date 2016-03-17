(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $location, $scope) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    vm.currentUser = response.data;
                });
        }
        init();

        function update() {
            var userId = vm.currentUser._id;
            var newUser = vm.currentUser;
            UserService
                .updateUser(userId, newUser)
                .then(function () {
                    UserService.setCurrentUser(newUser);
                });
        }
    }
})();