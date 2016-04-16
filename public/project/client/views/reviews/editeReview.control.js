(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("EditReviewCtrl", EditReviewCtrl);

    function EditReviewCtrl($rootScope, $routeParams, $location, UserService, DoctorSearchService, DoctorService, ReviewService) {
        var vm = this;
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
                        //find the doctor of being rated
                        return DoctorSearchService.findDoctorByUid(vm.review.doctorId)

                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        vm.doctor = response.data.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();

        function update() {
            ReviewService
                .updateReview(vm.review)
                .then(
                    function (response) {
                        $location.url('review');
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function cancel() {
            $location.url('review');
        }
    }
})();