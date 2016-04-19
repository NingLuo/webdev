(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("RemovePopCtrl", RemovePopCtrl);

    function RemovePopCtrl($uibModalInstance, ReviewService, reviewId, replyId) {
        var vm = this;
        vm.confirmRemove = confirmRemove;
        vm.cancel = cancel;

        function confirmRemove() {
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

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();
