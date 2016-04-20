(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller('MessageCtrl', MessageCtrl);

    function MessageCtrl (UserService, $rootScope, $location) {
        var vm = this;
        vm.messages;    //user's messages retrived from user service
        vm.msgContent;     //the message which was inputed into relpy bar
        vm.needReplyId = null; //a flag for show/hide reply bar
        vm.date = (new Date).getTime();
        vm.send = send;
        vm.removeMsg = removeMsg;
        vm.cancel = cancel;
        
        vm.openReplyBox = openReplyBox;
        vm.toggleMsgId = null;
        vm.toggleMsg = toggleMsg;

        function init() {
            UserService
                .findMessagesByUserId($rootScope.currentUser._id)
                .then(
                    function (response) {
                        vm.messages = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();

        //send reply message
        function send(targetUserId, messageId) {
            var newMessage = {
                senderId: $rootScope.currentUser._id,
                senderName: $rootScope.currentUser.username,
                msgContent:[{
                    senderName: $rootScope.currentUser.username,
                    content: vm.msgContent,
                    date: vm.date
                }]
            };
            //two params: first is reciever id, second is the message object
            UserService
                .sendMsgTo(targetUserId, newMessage)
                .then(
                    function () {
                        return UserService.saveMyMsg($rootScope.currentUser._id, messageId, newMessage);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        init();
                        vm.msgContent = null;
                        vm.needReplyId = null;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function removeMsg(message) {
            console.log(message);
            UserService
                .removeMsg($rootScope.currentUser._id, message._id)
                .then(function (response) {
                    vm.messages = response.data.messages;
                });
        }

        //cancel ongoing reply operation
        function cancel() {
            vm.msgContent = null;
            vm.needReplyId = null;
        }

        function openReplyBox(msgContent) {
            vm.needReplyId = msgContent._id;
        }

        function toggleMsg(index) {
            if(vm.toggleMsgId != null) {
                //arrow clicked on the same message box
                if(vm.toggleMsgId == index) {
                    vm.toggleMsgId = null;
                }
                else {
                    //arrow clicked on a different message box, which means vm.toggleMsgId != index
                    vm.toggleMsgId = index;
                }
            }
            else {
                vm.toggleMsgId = index;
            }
        }
    }
})();