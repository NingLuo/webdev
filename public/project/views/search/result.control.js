(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($http, $routeParams, $rootScope, DoctorSearchService){
        console.log("Hello from resultCtrl");

        var vm = this;

        var specialty = $routeParams.specialty;
        var location = $routeParams.location;
        console.log(specialty + " " + location + "from resultCtrl");

        DoctorSearchService
            .findDoctorBySpecialtyAndLocation(specialty, location)
            .then(function (response) {
                vm.doctors = response.data.data;
                //Because of the high failure rate of http request, I cache the search result in local memory
                $rootScope.currentDoctors = response.data.data;
            });
    }
})();