(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("EditReviewCtrl", EditReviewCtrl);

    function EditReviewCtrl($rootScope, $routeParams, $location, UserService, DoctorSearchService) {
        var vm = this;
        var reviews;
        var reviewId = $routeParams.reviewId;
        vm.review;
        vm.update = update;
        vm.cancel = cancel;

        function init () {
            //retrieve list of reviews of current logedin user
            reviews = UserService.findReviewsByUserId($rootScope.currentUser.u_id);
            //find the to be edited review by reviewId
            for(var i=0; i<reviews.length; i++) {
                if(reviews[i].id == reviewId) {        //这里用 === 会出错
                    vm.review = {
                        id: reviews[i].id,
                        doctorId: reviews[i].doctorId,
                        doctorName: reviews[i].doctorName,
                        reviewDate: reviews[i].reviewDate,
                        overall: reviews[i].overall,
                        waitTime: reviews[i].waitTime,
                        bedsideManner: reviews[i].bedsideManner,
                        comments: reviews[i].comments
                    };
                }
            }
            //find the doctor of being rated
            DoctorSearchService.findDoctorByUid(vm.review.doctorId)
                .then(function (response) {
                    vm.doctor = response.data.data;
                });
        }
        init();

        function update() {
            UserService.updateReview($rootScope.currentUser.u_id, vm.review, callback);

            function callback() {
                $location.url('review');
            }
        }

        function cancel() {
            $location.url('review');
        }
    }
})();