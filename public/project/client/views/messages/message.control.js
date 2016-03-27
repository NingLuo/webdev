(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller('MessageCtrl', MessageCtrl);

    function MessageCtrl (UserService, $rootScope, $location) {
        var vm = this;
        vm.messages;    //user's messages retrived from user service
        vm.targetMsg;
        vm.needReply = false; //a flag for show/hide reply bar
        vm.msgToSend;     //the message which was inputed into relpy bar
        vm.date = (new Date).getTime();
        vm.reply = reply;
        vm.send = send;
        vm.deleteMsg = deleteMsg;
        vm.cancel = cancel;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                        UserService
                            .findMessagesByUserId($rootScope.currentUser.u_id)
                            .then(function (response) {
                                vm.messages = response.data;
                            });
                    }
                    else {
                        $location.url('/login');
                    }
                });
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
            vm.msgToSend.id = (new Date).getTime();
            vm.msgToSend.senderId = $rootScope.currentUser.u_id;
            vm.msgToSend.from = $rootScope.currentUser.username;
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
        }im

        //cancel ongoing reply operation
        function cancel() {
            vm.msgToSend = {};
            vm.needReply = false;
        }
    }
})();