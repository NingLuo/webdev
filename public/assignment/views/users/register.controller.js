(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register(user){
            UserService.createUser(user, callback);

            function callback(callbackUser) {
                $rootScope.currentUser = callbackUser;
                $location.path('profile');
            }
        }
    }
})();