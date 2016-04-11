(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController() {
        var vm = this;

        function init() {
            console.log("AdminController");
        }
        init();
    }
})();

