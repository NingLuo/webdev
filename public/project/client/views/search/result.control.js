(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($location, $routeParams, $rootScope, DoctorSearchService, UserService){
        var vm = this;
        vm.specialty = $routeParams.specialty;
        vm.location = $routeParams.location;
        vm.insurance = $routeParams.insurance;
        vm.gender = $routeParams.gender;
        vm.doctorName = $routeParams.name;
        vm.specialtyOptions;
        vm.locationOptions;
        vm.insuranceOptions;
        vm.genderOptions;
        vm.search = search;
        vm.renderResult = renderResult;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                        search();
                    }
                });
        }
        init();

        vm.specialtyOptions = [
            {label:"Primary Care", value:"primary care"},
            {label:"Pediatrician", value:"pediatrician"},
            {label:"Allergist", value:"allergist"},
            {label:"Cardiologist", value:"cardiologist"}
        ];

        vm.locationOptions = [
            {label: "Boston", value: "ma-boston"},
            {label: "Berkeley", value: "ca-berkeley"},
            {label: "Washington", value: "dc-washington"}
        ];

        vm.insuranceOptions = [
            {label: "Medicare", value: "medicare"},
            {label: "Medicaid", value: "medicaid"},
            {label: "BlueCross BlueShield", value: "bluecross_blueshield"}
        ];

        vm.genderOptions = [
            {label: "Male", value: "male"},
            {label: "Female", value: "female"}
        ];


        function search() {
            var constraints = {
                specialty: vm.specialty,
                location : vm.location,
                insurance: vm.insurance,
                gender   : vm.gender,
                doctorName: vm.doctorName
            };
            console.log(constraints);

            DoctorSearchService
                .findDocByConstraints(constraints)
                .then(function (response) {
                    console.log(response.data);
                    vm.doctors = response.data.data;
                    //a precaution for bad api connection
                    //$rootScope.currentDoctors = response.data.data;
                    $location.url('/result/specialty/' + vm.specialty + '/location/' + vm.location +'/insurance/' + vm.insurance + '/gender/'+ vm.gender +'/name/' + vm.doctorName);
                });
        }

        function renderResult(result) {
            vm.doctors = result;
            //Because of the high failure rate of http request, I cache the search result in local memory
            $rootScope.currentDoctors = result;
        }
        
    }
})();