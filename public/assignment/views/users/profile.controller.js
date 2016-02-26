(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope) {
        $scope.currentUser = {
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email
        }

        $scope.update = update;
        var callback = callback;

        function update() {
            UserService.updateUser($scope.currentUser._id, $scope.currentUser, callback);
        }

        function callback(updatedUser) {
            console.log("Update success: " + updatedUser._id);
        }

    }
})();