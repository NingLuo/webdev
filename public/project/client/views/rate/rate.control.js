(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RateCtrl", RateCtrl);

    function RateCtrl ($routeParams, $location, $rootScope, DoctorSearchService, UserService, DoctorService, ReviewService) {
        var vm    = this;
        vm.uid    = $routeParams.uid; //doctor uid
        vm.submit = submit;
        vm.cancel = cancel;
        vm.submitSuccuss = false;   //a boolean variable for controlling the hide and show of success alert in the view
        var reviewId;

        function init () {
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function (response) {
                    vm.doctor = response.data.data;
                });
        }
        init();

        function submit(rate) {
            //rate.id = (new Date).getTime();
            rate.userId = $rootScope.currentUser._id;
            rate.username = $rootScope.currentUser.username;
            rate.doctorName = "Dr." + vm.doctor.profile.first_name + " " + vm.doctor.profile.last_name;
            //rate.doctorImage = vm.doctor.profile.image_url;
            rate.doctorId = vm.uid;
            rate.reviewDate = (new Date).getTime();
            ReviewService
                .createReview(rate)
                .then(
                    function (response) {
                        reviewId = response.data._id;
                        //save the reviewId in user model
                        return UserService.addReview(rate.userId, reviewId);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        //response from adding review to user
                        console.log(response);
                        //save the reviewId in doctor model
                        return DoctorService.addReview(rate.doctorId, reviewId);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        //response from adding review to doctor
                        console.log(response);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            //UserService
            //    .addRateByUid($rootScope.currentUser.u_id, rate)
            //    .then(function () {
            //        //jump to previous detail page
            //        DoctorService
            //            .addRate(vm.uid, rate)
            //            .then(function () {
            //                vm.submitSuccuss = true;
            //                //$location.url("/detail/"+vm.uid);
            //            });
            //    });
        }

        function cancel(rate) {
            rate = {};
            console.log("cancel");
            $location.url("/detail/"+vm.uid);
        }
    }
})();

