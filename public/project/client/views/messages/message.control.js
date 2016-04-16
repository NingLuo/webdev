(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller('MessageCtrl', MessageCtrl);

    function MessageCtrl (UserService, $rootScope, $location) {
        var vm = this;
        vm.messages;    //user's messages retrived from user service
        vm.targetMsg;   //the message was chosen to reply
        vm.needReply = false; //a flag for show/hide reply bar
        vm.msgToSend;     //the message which was inputed into relpy bar
        vm.date = (new Date).getTime();
        vm.reply = reply;
        vm.send = send;
        vm.deleteMsg = deleteMsg;
        vm.cancel = cancel;

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

        //select a message, show it in the reply input area
        function reply(message) {
            vm.needReply = true;
            vm.targetMsg = message;
        }

        //send reply message
        function send() {
            //vm.msgToSend.receiver = vm.targetMsg.from;
            vm.msgToSend.senderId = $rootScope.currentUser._id;
            vm.msgToSend.senderName = $rootScope.currentUser.username;
            vm.msgToSend.date = vm.date;
            //two params: first is reciever id, second is the message object
            UserService
                .sendMsgTo(vm.targetMsg.senderId, vm.msgToSend)
                .then(function () {
                    vm.msgToSend = {};
                    vm.needReply = false;
                });
        }

        function deleteMsg(message) {
            UserService
                .deleteMsg($rootScope.currentUser.u_id, message.id)
                .then(function (response) {
                    vm.messages = response.data.messages;
                });
        }

        //cancel ongoing reply operation
        function cancel() {
            vm.msgToSend = {};
            vm.needReply = false;
        }
    }
})();