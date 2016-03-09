(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController);

    function MainController ($location, DoctorSearchService) {

        var vm = this;
        vm.search = search;
        vm.$location = $location;


        function search (doctor) {
            //vm.specialty = specialty;
            //vm.location = location;
            var location;
            if(doctor.city == 'Boston') {
                location = '42.3611,-71.0577,20';
            } else if(doctor.city == 'New York') {
                location = '40.7483,-73.9929,20';
            }
            console.log(doctor.specialty + " " + location);
            $location.url('/result/specialty/' + doctor.specialty + '/location/' + location);
        }
    }
})();