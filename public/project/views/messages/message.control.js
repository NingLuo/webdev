(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller('MessageCtrl', MessageCtrl);

    function MessageCtrl (UserService, $rootScope, $location) {
        console.log("MessageCtrl says hello");
        var vm = this;
        vm.messages;    //user's messages retrived from user service
        vm.targetMsg;
        vm.date = (new Date).getTime();
        vm.reply = reply;
        vm.send = send;
        vm.needReply = false;
        vm.msgToSend;
        vm.deleteMsg = deleteMsg;
        vm.cancel = cancel;

        function init() {
            if($rootScope.currentUser) {
               vm.messages =  UserService.findMessagesByUserId($rootScope.currentUser.u_id);
                console.log(vm.messages);
            } else {
                $location.url('/login');
            }
        }
        init();

        //select a message, show it in the reply input area
        function reply(message) {
            console.log("reply");
            vm.needReply = true;
            vm.targetMsg = message;
        }

        //send reply message
        function send() {
            vm.msgToSend.receiver = vm.targetMsg.from;
            vm.msgToSend.from = $rootScope.currentUser.username;
            vm.msgToSend.date = vm.date;

            UserService.sendMsgTo(vm.msgToSend);
            vm.msgToSend = {};
            vm.needReply = false;
        }

        function deleteMsg(index) {
            vm.messages.splice(index,1);
        }

        //cancel ongoing reply operation
        function cancel() {
            vm.msgToSend = {};
            vm.needReply = false;
        }
    }
})();