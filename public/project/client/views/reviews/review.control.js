(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ReviewCtrl", ReviewCtrl);

    function ReviewCtrl ($rootScope, $location, UserService, DoctorService, ReviewService, $uibModal) {
        var vm = this;
        vm.reviews = null;
        vm.edit = edit;
        vm.deleteReview= deleteReview;
        vm.openReplyPop = openReplyPop;

        function init() {
            //if logged in user is a patient
            if($rootScope.currentUser.role == "Patient") {
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
            else {
                //if logged in user is a provider
                ReviewService
                    .findReviewByDoctorId($rootScope.currentUser.doctorId)
                    .then(
                        function (response) {
                            vm.reviews = response.data;
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
            }
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

        function openReplyPop(review) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'views/search/docReplyPop.view.html',
                    controller: 'DocReplyPopCtrl as model',
                    resolve: {
                        review: function () {
                            return review;
                        }
                    }
                }
            );

            modalInstance.result.then(
                //function to be called after the openReplyPop is auto closed;
                function () {
                    ReviewService
                        .findReviewByDoctorId($rootScope.currentUser.doctorId)
                        .then(
                            function (response) {
                                vm.reviews = response.data;
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                }
            );
        }
    }
})();