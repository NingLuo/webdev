(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register(user){
            UserService
                .createUser(user)
                .then(function (response) {
                    console.log(response.data);
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        console.log($rootScope.currentUser);
                        $location.url('/profile');
                    } else {
                        console.log("register error");
                    }
                });
        }
    }
})();