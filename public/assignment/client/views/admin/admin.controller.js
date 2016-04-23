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
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        vm.sortBy = sortBy;
        vm.predicate;
        vm.reverse = true;
        vm.triangle;

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

        function selectUser(user) {
            vm.user = angular.copy(user);
        }

        function updateUser() {
            UserService
                .adminUpdateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        init();
                        vm.user = null;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        function sortBy(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            if(vm.reverse) {
                vm.triangle = 'glyphicon glyphicon glyphicon-triangle-bottom';
            }
            else {
                vm.triangle = 'glyphicon glyphicon glyphicon-triangle-top';
            }
        }
    }
})();

