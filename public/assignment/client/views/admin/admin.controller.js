(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        console.log(response.date);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }
        init();
    }
})();

