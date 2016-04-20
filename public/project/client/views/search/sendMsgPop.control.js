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

        function sendMsg(content) {
            //$http.post need to take an object as body, not a string message
            var msgContent = {
                senderName: $rootScope.currentUser.username,
                date: new Date(),
                content: content
            };

            var message = {
                senderId   : $rootScope.currentUser._id,
                senderName : $rootScope.currentUser.username,
                msgContent    : [msgContent]
            };
            UserService
                .sendMsgTo(reviewerId, message)
                .then(
                    function (response) {
                        $uibModalInstance.close();
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
