(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user){
            UserService
                .createUser(user)
                .then(function (response) {
                    console.log(response.data);
                    if(response.data) {
                        var currentUser = response.data;
                        UserService.setCurrentUser(currentUser);
                        $location.url('/profile');
                    } else {
                        console.log("register error");
                    }
                });
        }
    }
})();