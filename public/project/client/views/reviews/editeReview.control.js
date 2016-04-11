(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("EditReviewCtrl", EditReviewCtrl);

    function EditReviewCtrl($rootScope, $routeParams, $location, UserService, DoctorSearchService, DoctorService, ReviewService) {
        var vm = this;
        var reviews;
        var reviewId = $routeParams.reviewId;
        vm.review;
        vm.update = update;
        vm.cancel = cancel;

        function init () {
            ReviewService
                .findReviewById(reviewId)
                .then(
                    function (response) {
                        vm.review = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            //UserService
                //.findReviewsByUserId($rootScope.currentUser.u_id)
                //.then(function (response) {
                //    reviews = response.data;
                //    //find the to be edited review by reviewId and assign it to local variable vm.review for rendering purpose
                //    for(var i=0; i<reviews.length; i++) {
                //        if(reviews[i].id == reviewId) {        //这里用 === 会出错
                //            vm.review = {
                //                id: reviews[i].id,
                //                doctorId: reviews[i].doctorId,
                //                doctorName: reviews[i].doctorName,
                //                reviewDate: reviews[i].reviewDate,
                //                overall: reviews[i].overall,
                //                waitTime: reviews[i].waitTime,
                //                bedsideManner: reviews[i].bedsideManner,
                //                comments: reviews[i].comments
                //            };
                //        }
                //    }
                //    //find the doctor of being rated
                //    DoctorSearchService
                //        .findDoctorByUid(vm.review.doctorId)
                //        .then(function (response) {
                //            vm.doctor = response.data.data;
                //        });
                //});
        }
        init();

        function update() {
            UserService
                .updateReview($rootScope.currentUser.u_id, vm.review)
                .then(function () {
                    DoctorService
                        .updateRate(vm.doctor.uid, vm.review)
                        .then(function () {
                            $location.url('review');
                        });
                });
        }

        function cancel() {
            $location.url('review');
        }
    }
})();