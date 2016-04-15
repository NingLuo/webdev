(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("SendMsgPopCtrl", SendMsgPopCtrl);

    function SendMsgPopCtrl($uibModalInstance, reviewerId, reviewerName, UserService, $rootScope) {
        var vm = this;
        vm.reviewerId = reviewerId;
        vm.reviewerName = reviewerName;
        vm.sendMsg = sendMsg;

        function sendMsg(msgContent) {
            //$http.post need to take an object as body, not a string message
            var message = {
                senderId   : $rootScope.currentUser._id,
                senderName : $rootScope.currentUser.username,
                content    : msgContent
            };

            UserService
                .sendMsgTo(reviewerId, message)
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
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
