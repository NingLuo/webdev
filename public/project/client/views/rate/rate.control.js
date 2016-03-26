(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RateCtrl", RateCtrl);

    function RateCtrl ($routeParams, $location, $rootScope, DoctorSearchService, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.submit = submit;
        vm.cancel = cancel;
        vm.submitSuccuss = false;   //a boolean variable for controlling the hide and show of success alert in the view

        function init () {
            DoctorSearchService.findDoctorByUid(vm.uid)
                .then(function (response) {
                    vm.doctor = response.data.data;
                });
        }
        init();

        function submit(rate) {
            rate.id = (new Date).getTime();
            rate.doctorName = "Dr." + vm.doctor.profile.first_name + " " + vm.doctor.profile.last_name;
            rate.doctorImage = vm.doctor.profile.image_url;
            rate.doctorId = vm.uid;
            rate.reviewDate = (new Date).getTime();
            UserService
                .addRateByUid($rootScope.currentUser.u_id, rate)
                .then(function () {
                    vm.submitSuccuss = true;
                    //jump to previous detail page
                });
        }

        function cancel(rate) {
            rate = {};
            console.log("cancel");
            $location.url("/detail/"+vm.uid);
        }
    }
})();

