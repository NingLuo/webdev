(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user){
            if(user.password != user.verifyPassword || !user.password) {
                console.log("Your two passwords don't match");
            }
            else
            {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            if(response.data) {
                                UserService.setCurrentUser(response.data);
                                $location.url('/profile');
                            } else {
                                console.log("The username has already been used.");
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            }
        }
    }
})();