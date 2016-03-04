(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RateCtrl", RateCtrl);

    function RateCtrl ($routeParams, DoctorSearchService) {

        var vm = this;
        vm.uid = $routeParams.uid;
        DoctorSearchService.findDoctorByUid(vm.uid)
            .then(function (response) {
                vm.doctor = response.data.data;
            });
    }
})();