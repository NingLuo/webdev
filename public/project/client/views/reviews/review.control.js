(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ReviewCtrl", ReviewCtrl);

    function ReviewCtrl ($rootScope, $location, UserService, DoctorService) {
        var vm = this;
        vm.reviews = null;
        vm.edit = edit;
        vm.deleteReview= deleteReview;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                        UserService
                            .findReviewsByUserId($rootScope.currentUser.u_id)
                            .then(function (response) {
                                vm.reviews = response.data;
                            });
                    }
                    else {
                        $location.url('/login');
                    }
                });
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