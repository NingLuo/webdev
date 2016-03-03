(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController);

    function MainController ($location) {

        var vm = this;
        vm.search = search;

        function search () {
            console.log("clicked search btn")
            $location.url('result');
        }
    }
})();