(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController);

    function MainController ($location, DoctorSearchService) {

        var vm = this;
        vm.search = search;
        vm.$location = $location;
        vm.illegal = false;


        function search (city, specialty) {
            console.log(city, + " " + specialty);
            if(city && specialty) {
                var location;
                if(city == 'Boston') {
                    location = '42.3611,-71.0577,20';
                } else if(city == 'New York') {
                    location = '40.7483,-73.9929,20';
                }
                console.log(specialty + " " + location);
                $location.url('/result/specialty/' + specialty + '/location/' + location);
            } else {
                console.log("Both city and specilty are required");
                vm.illegal = true;
            }
        }
    }
})();