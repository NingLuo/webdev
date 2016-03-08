(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RateCtrl", RateCtrl);

    function RateCtrl ($routeParams, $rootScope, DoctorSearchService, UserService) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.submit = submit;
        vm.submitSuccuss = false;   //a boolean variable for controlling the hide and show of success alert in the view

        function init () {
            DoctorSearchService.findDoctorByUid(vm.uid)
                .then(function (response) {
                    vm.doctor = response.data.data;
                });
        }
        init();

        function submit(rate) {
            rate.doctorName = "Dr." + vm.doctor.profile.first_name + " " + vm.doctor.profile.last_name;
            rate.doctorImage = vm.doctor.ratings[0].image_url_small;
            rate.reviewDate = (new Date).getTime();
            vm.submitSuccuss =  UserService.addRate($rootScope.currentUser.u_id, rate);
        }
    }
})();

