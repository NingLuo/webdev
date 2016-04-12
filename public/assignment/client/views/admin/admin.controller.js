(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;
        vm.users;
        vm.user;
        vm.createUser = createUser;
        vm.removeUser = removeUser;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }
        init();

        function createUser() {
            UserService
                .createUser(vm.user)
                .then(
                    function (response) {
                        if(response.data) {
                            vm.users.push(response.data);
                            vm.user = {};
                        } else {
                            console.log("The username has been used.");
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        function removeUser(user) {
            UserService
                .removeUserById(user._id)
                .then(
                    function (response) {
                        //remove success, reset vm.users
                        init();
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }
    }
})();

