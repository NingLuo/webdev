(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController);

    function MainController ($location, DoctorSearchService) {

        var vm = this;
        vm.search = search;
        vm.$location = $location;


        function search (specialty, location) {
            //vm.specialty = specialty;
            //vm.location = location;
            vm.specialty = "ophthalmologist";
            vm.location = "37.773%2C-122.413%2C100";
        }
    }
})();