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
        vm.openEditBox = openEditBox;
        vm.cancelEdit = cancelEdit;
        vm.updateReply = updateReply;
        vm.openRemovePop = openRemovePop;
        vm.replyId;
        vm.editId;
        vm.reviewContent;
        vm.oldContent;

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

        function openEditBox(reviewId, oldContent) {
            //used as backup content for recovery after canceling the edit
            vm.oldContent = oldContent;
            //used for rendering in the edit textarea
            vm.reviewContent = oldContent;

            vm.editId = reviewId;
        }

        function cancelEdit() {
            //recover to unchanged old content after canceling the edit
            vm.reviewContent = vm.oldContent;

            vm.editId = null;
        }

        function updateReply(review) {
            review.reply.content = vm.reviewContent;
            review.reply.date = new Date();
            ReviewService
                .updateReply(review)
                .then(
                    function (response) {
                        //close edit box
                        vm.editId = null;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        function openRemovePop(review) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: "views/reviews/removePop.view.html",
                    controller: "RemovePopCtrl as model",
                    resolve:{
                        reviewId: function () {
                            return review._id;
                        },
                        replyId: function () {
                            return review.reply._id;
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