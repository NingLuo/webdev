(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {

        $scope.login = login;
        var callback = function(currentUser) {
            if(currentUser) {
                $rootScope.currentUser = currentUser;
                $location.path('profile');
            } else {
                console.log("Did't find a match user.");
            }
        };

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, callback);
        }
    }
})();