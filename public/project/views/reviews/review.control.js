(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ReviewCtrl", ReviewCtrl);

    function ReviewCtrl ($rootScope, $location, UserService) {
        var vm = this;
        vm.reviews = null;
        vm.edit = edit;

        function init() {
            vm.reviews =  UserService.findReviewsByUserId($rootScope.currentUser.u_id);
        }
        init();

        function edit(review) {
            console.log(review.id);
            $location.url('editReview/'+ review.id);
        }
    }
})();