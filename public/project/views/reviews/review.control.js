(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ReviewCtrl", ReviewCtrl);

    function ReviewCtrl ($rootScope, UserService) {
        var vm = this;
        vm.reviews = null;

        function init() {
            vm.reviews =  UserService.findReviewsByUserId($rootScope.currentUser.u_id);
            console.log(vm.reviews[0].comments);
        }
        init();
    }
})();