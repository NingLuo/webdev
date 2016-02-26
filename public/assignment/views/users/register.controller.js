(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register(user){

            var callback = function(callbackUser) {
                $rootScope.currentUser = callbackUser;
                console.log("callbackUser:" + callbackUser.username + callbackUser._id + callbackUser.email);
                $location.path('profile');
            };

            UserService.createUser(user, callback);
        }

    }
})();