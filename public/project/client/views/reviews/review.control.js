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
            $location.url('editReview/'+ review.id);
        }

        function deleteReview(review) {
            UserService
                .deleteReview($rootScope.currentUser.u_id, review.id)
                .then(function (response) {
                    vm.reviews = response.data; // shouldn't be put here, fix this in future version
                    DoctorService
                        .deleteRate(review.doctorId, review.id)
                        .then(function () {
                            console.log("also deleted rate in doctor model")
                        });
                });
        }
    }
})();