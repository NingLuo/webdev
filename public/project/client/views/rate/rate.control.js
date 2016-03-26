(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RateCtrl", RateCtrl);

    function RateCtrl ($routeParams, $location, $rootScope, DoctorSearchService, UserService, DoctorService) {
        var vm = this;
        vm.uid = $routeParams.uid; //doctor uid
        vm.submit = submit;
        vm.cancel = cancel;
        vm.submitSuccuss = false;   //a boolean variable for controlling the hide and show of success alert in the view

        function init () {
            //check user session and fetch current user
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                        //start to fetch doctor data by vm.uid
                        DoctorSearchService.findDoctorByUid(vm.uid)
                            .then(function (response) {
                                vm.doctor = response.data.data;
                            });
                    }
                    else {
                        $location.url('/login');
                    }
                });
        }
        init();

        function submit(rate) {
            rate.id = (new Date).getTime();
            rate.userId = $rootScope.currentUser.u_id;
            rate.username = $rootScope.currentUser.username;
            rate.doctorName = "Dr." + vm.doctor.profile.first_name + " " + vm.doctor.profile.last_name;
            rate.doctorImage = vm.doctor.profile.image_url;
            rate.doctorId = vm.uid;
            rate.reviewDate = (new Date).getTime();
            UserService
                .addRateByUid($rootScope.currentUser.u_id, rate)
                .then(function () {
                    //jump to previous detail page
                    DoctorService
                        .addRate(vm.uid, rate)
                        .then(function () {
                            vm.submitSuccuss = true;
                            //$location.url("/detail/"+vm.uid);
                        });
                });
        }

        function cancel(rate) {
            rate = {};
            console.log("cancel");
            $location.url("/detail/"+vm.uid);
        }
    }
})();

