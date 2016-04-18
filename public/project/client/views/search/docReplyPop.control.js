(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("DocReplyPopCtrl", DocReplyPopCtrl);

    function DocReplyPopCtrl($uibModalInstance, review, ReviewService) {
        var vm = this;
        vm.reviewerName = review.username;
        vm.reply = reply;

        function reply(content) {
            var reply = {};
            reply.senderId = review.doctorId;
            reply.senderName = review.doctorName;
            reply.content = content;
            ReviewService
                .addReply(review._id, reply)
                .then(
                    function (response) {
                        console.log(response.data);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        vm.close = function () {
            $uibModalInstance.dismiss();
        };
    }
})();
