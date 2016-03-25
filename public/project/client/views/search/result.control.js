(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($http, $routeParams, $rootScope, DoctorSearchService){
        var vm = this;
        vm.specialty = $routeParams.specialty;
        vm.location = $routeParams.location;
        vm.insurance = null;
        vm.gender = null;
        vm.doctorName = null;
        vm.specialtyOptions;
        vm.locationOptions;
        vm.insuranceOptions;
        vm.genderOptions;
        vm.search = search;
        vm.renderResult = renderResult;

        function init() {
            console.log(vm.location);

            DoctorSearchService
                .findDoctorBySpecialtyAndLocation(vm.specialty, vm.location)
                .then(function (response) {
                    renderResult(response.data.data);
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

            DoctorSearchService
                .findDocByConstraints(constraints)
                .then(function (response) {
                    console.log(response.data);
                    vm.doctors = response.data.data;
                    $rootScope.currentDoctors = response.data.data;
                })
        }

        function renderResult(result) {
            vm.doctors = result;
            //Because of the high failure rate of http request, I cache the search result in local memory
            $rootScope.currentDoctors = result;
        }
        
    }
})();