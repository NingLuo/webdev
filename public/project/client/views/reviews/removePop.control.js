(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RemovePopCtrl", RemovePopCtrl);

    function RemovePopCtrl($uibModalInstance, $rootScope, ReviewService, DoctorService, UserService, reviewId, replyId, doctorId) {
        var vm = this;
        vm.confirmRemove = confirmRemove;
        vm.cancel = cancel;

        function confirmRemove() {
            if($rootScope.currentUser.role == "Provider") {
                ReviewService
                    .removeReply(reviewId, replyId)
                    .then(
                        function (response) {
                            $uibModalInstance.close();
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
            }
            else {
                //if currentUser is a patient
                ReviewService
                    .deleteReview(reviewId)
                    .then(
                        function (response) {
                            //delete review reference in doctor model
                            return DoctorService.deleteReview(doctorId, reviewId);
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                    .then(
                        function (response) {
                            //delete review reference in user model
                            return UserService.deleteReview($rootScope.currentUser._id, reviewId);
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                    .then(
                        function (user) {
                            $uibModalInstance.close();
                        },
                        function (err) {
                            console.log(err);
                        }
                    );

            }
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();
