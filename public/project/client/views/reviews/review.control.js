(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ReviewCtrl", ReviewCtrl);

    function ReviewCtrl ($rootScope, $location, UserService, DoctorService, ReviewService) {
        var vm = this;
        vm.reviews = null;
        vm.edit = edit;
        vm.deleteReview= deleteReview;

        function init() {
            ReviewService
                .findReviewByUserId($rootScope.currentUser._id)
                .then(
                    function (response) {
                        vm.reviews = response.data;
                    },
                    function (err) {
                        console.log(err)
                    }
                );
        }
        init();

        function edit(review) {
            $location.url('editReview/'+ review._id);
        }

        function deleteReview(review) {
            ReviewService
                .deleteReview(review._id)
                .then(
                    function (response) {
                        //delete review reference in doctor model
                        return DoctorService.deleteReview(review.doctorId, review._id);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        //delete review reference in user model
                        return UserService.deleteReview($rootScope.currentUser._id, review._id);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (user) {
                        vm.reviews = user.reviews;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
    }
})();