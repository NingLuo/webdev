(function(){
    angular
        .module("FindDoctorApp")
        .controller("resultCtrl",resultCtrl);

    function resultCtrl($http, $routeParams, $rootScope, DoctorSearchService){
        var vm = this;
        vm.specialty = $routeParams.specialty;
        vm.location = $routeParams.location;
        vm.insurance;
        vm.gender = "Gender";
        vm.language = "Language";
        vm.name;
        vm.specialtyOptions;
        vm.locationOptions;
        vm.insuranceOptions;
        vm.genderOptions;
        vm.languageOptions;

        function init() {
            console.log(vm.location);

            DoctorSearchService
                .findDoctorBySpecialtyAndLocation(vm.specialty, vm.location)
                .then(function (response) {
                    vm.doctors = response.data.data;
                    //Because of the high failure rate of http request, I cache the search result in local memory
                    $rootScope.currentDoctors = response.data.data;
                });
        }
        init();

        vm.specialtyOptions = [
            {label:"Primary Care", value:"primary care"},
            {label:"Allergist", value:"allergist"},
            {label:"Cardiologist", value:"cardiologist"}
        ];

        vm.locationOptions = [
            {label: "Boston", value: "ma-boston"},
            {label: "New York", value: "ny-newyork"},
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

        vm.languageOptions = [
            {label: "English", value: "English"},
            {label: "Spanish", value: "Spanish"},
            {label: "Mandarine", value: "Mandarine"}
        ];



        function search() {
            var constraints = null;
            DoctorSearchService
                .findDocByConstraints(constraints);
        }
        
        
    }
})();