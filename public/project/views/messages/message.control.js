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

        function init() {
            if($rootScope.currentUser) {
               vm.messages =  UserService.findMessagesByUserId($rootScope.currentUser.u_id);
                console.log(vm.messages);
            } else {
                $location.url('/login');
            }
        }
        init();

        function reply(message) {
            console.log("reply");
            vm.needReply = true;
            vm.targetMsg = message;
        }

        function send() {
            vm.msgToSend.receiver = vm.targetMsg.from;
            vm.msgToSend.from = $rootScope.currentUser.username;
            vm.msgToSend.date = vm.date;

            UserService.sendMsgTo(vm.msgToSend);
            vm.msgToSend = {};
            vm.needReply = false;
        }
    }
})();