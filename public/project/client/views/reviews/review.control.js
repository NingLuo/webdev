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
        vm.openReplyBox = openReplyBox;
        vm.cancelReply = cancelReply;
        vm.submiteReply = submiteReply;
        vm.replyId;

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

        function openReplyBox(reviewId) {
            vm.replyId = reviewId;
        }

        function cancelReply(reply) {
            //clear content in the textarea
            if(reply!=null) {
                reply.content = null;
            }
            //hide the reply box
            vm.replyId = null;
        }

        function submiteReply(reply, review) {
            reply.senderId = review.doctorId;
            reply.senderName = review.doctorName;
            ReviewService
                .addReply(review._id, reply)
                .then(
                    function (response) {
                        //close reply box
                        vm.replyId = null;
                        //refetch page content
                        return ReviewService.findReviewByDoctorId($rootScope.currentUser.doctorId)
                    },
                    function (err) {
                        console.log(err);
                    }
                )
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
})();