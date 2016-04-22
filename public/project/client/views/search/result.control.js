(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($location, $routeParams, DoctorSearchService, LocationService){
        var vm = this;
        vm.specialty     = $routeParams.specialty;
        vm.geolocation   = $routeParams.geolocation;
        vm.zipCode       = $routeParams.zipCode;
        vm.insurance     = $routeParams.insurance;
        vm.gender        = $routeParams.gender;
        vm.doctorName    = $routeParams.name;
        vm.zipCodeIsNull = false;

        vm.search        = search;

        function init() {
            //convert vm.doctoName from "null" to null
            if($routeParams.name === "null" || $routeParams.name === "") {
                vm.doctorName = null;
            }
            //config search constraints
            var constraints = {
                specialty: vm.specialty,
                geolocation : vm.geolocation,
                insurance: vm.insurance,
                gender   : vm.gender,
                doctorName: vm.doctorName
            };
            //perform search
            DoctorSearchService
                .findDocByConstraints(constraints)
                .then(function (response) {
                    console.log(response.data);
                    vm.doctors = response.data.data;
                });
        }
        init();

        function search() {
            //check if location input is empty
            if(!vm.zipCode) {
                vm.zipCodeIsNull = true;
                return;
            }

            //step 1: convert zipCode to geolocation
            var geolocation = null;
            LocationService
                .getGeolocation(vm.zipCode)
                .then(
                    function (response) {
                        geolocation = response.data.results[0].geometry.location;
                        geolocation = geolocation.lat + "," + geolocation.lng + ",40";
                        console.log(geolocation);
                        //check doctorName input
                        if(vm.doctorName == "") {
                            vm.doctorName = null;
                        }

                        //step 2: create doctor search constraints
                        var constraints = {
                            specialty: vm.specialty,
                            geolocation : geolocation,
                            insurance: vm.insurance,
                            gender   : vm.gender,
                            doctorName: vm.doctorName
                        };

                        //step 3: search doctor by constraints
                        return DoctorSearchService.findDocByConstraints(constraints)

                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        vm.doctors = response.data.data;
                        //record url in case of refresh page
                        $location.url('/result/specialty/' + vm.specialty + '/geolocation/' + geolocation + '/zipCode/' + vm.zipCode +'/insurance/' + vm.insurance + '/gender/'+ vm.gender +'/name/' + vm.doctorName);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
    }
})();