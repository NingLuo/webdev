(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService) {

        var callback = function() {}

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, callback);
        }
    }
})();