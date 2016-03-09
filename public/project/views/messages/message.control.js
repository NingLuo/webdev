(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller('MessageCtrl', MessageCtrl);

    function MessageCtrl (UserService, $rootScope, $location) {
        console.log("MessageCtrl says hello");
        var vm = this;
        vm.messages;

        function init() {
            if($rootScope.currentUser) {
               vm.messages =  UserService.findMessagesByUserId($rootScope.currentUser.u_id);
                console.log(vm.messages);
            } else {
                $location.url('/login');
            }
        }
        init();
    }
})();