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
            //Because of the high failure rate of http request, I cash the currentDoctor info in $rootScope.currentDoctor
            //DoctorSearchService.findDoctorByUid(vm.uid)
            //    .then(function (response) {
            //        vm.doctor = response.data.data;
            //    });

            for(var i=0; i<$rootScope.currentDoctors.length; i++) {
                if(vm.uid === $rootScope.currentDoctors[i].uid) {
                    vm.doctor = $rootScope.currentDoctors[i];
                }
            }
        }
        init();

        function submit(rate) {
            rate.doctorName = "Dr." + vm.doctor.profile.first_name + " " + vm.doctor.profile.last_name;
            rate.doctorImage = vm.doctor.profile.image_url
            rate.doctorId = vm.uid;
            rate.reviewDate = (new Date).getTime();
            vm.submitSuccuss =  UserService.addRate($rootScope.currentUser.u_id, rate);
        }
    }
})();

