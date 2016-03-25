(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("SearchBarCtrl", SearchBarCtrl);

    function SearchBarCtrl($location, $routeParams) {
        var vm = this;
        vm.$location = $location;
        vm.specialty = $routeParams.specialty;
        vm.location = $routeParams.location;


        function init() {
            console.log(vm.specialty);
        }
        init();
    }
})();