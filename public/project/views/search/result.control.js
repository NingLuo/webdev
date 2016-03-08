(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($http, $routeParams, DoctorSearchService){
        console.log("Hello from resultCtrl");

        var vm = this;

        var specialty = $routeParams.specialty;
        var location = $routeParams.location;

        DoctorSearchService
            .findDoctorBySpecialtyAndLocation(specialty, location)
            .then(function (response) {
                vm.doctors = response.data.data;
            });

        $http.get(resource_url).success(function(response) {
            console.log(response);
        });
    }
})();