(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService, UserService, DoctorService, ReviewService, $location, $rootScope, $uibModal) {
        var vm = this;
        vm.uid = $routeParams.uid;   //this doctor's universal id
        vm.addFavorite = addFavorite;
        vm.rate = rate;
        vm.viewInsurance = viewInsurance;
        vm.reviews;
        vm.openMsgPop = openMsgPop;
        vm.openReplyPop = openReplyPop;
        vm.openVerifPop = openVerifPop;

        vm.addSuccess = false;    //a boolean variable controlling the show and hide of success alert in view

        function init() {
            console.log(vm.uid);
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    vm.data = response.data.data;
                    return ReviewService.findReviewByDoctorId(vm.uid);
                })
                .then(
                    function (response) {
                        vm.reviews = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();

        function addFavorite() {
            UserService
                .addFavoriteByUid($rootScope.currentUser._id ,vm.uid)
                .then(function () {
                    return DoctorService.addFavoritedBy(vm.uid, $rootScope.currentUser._id);
                })
                .then(function (res) {
                    vm.addSuccess = true;
                });
        }

        function rate() {
            //check if user has logged in
            if($rootScope.currentUser ) {
                $location.url('/rate/'+vm.data.uid);
            } else {
            //if user is not logged in, redirect to login page
                $location.url('/login');
            }
        }

        function viewInsurance(insuranceList) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'views/search/insuranceDetail.view.html',
                    controller: 'InsuranceDetailCtrl as model',
                    resolve: {
                        //this is the variable that passed the to insuranceDetail controller
                        insuranceList: function () {
                            return insuranceList;
                        }
                    }
                }
            );
        }

        function openMsgPop(reviewerId, reviewerName) {
            if($rootScope.currentUser) { // remember to fix this
                var modalInstance = $uibModal.open(
                    {
                        templateUrl: 'views/search/sendMsgPop.view.html',
                        controller: 'SendMsgPopCtrl as model',
                        resolve: {
                            //this is the variable that passed the to SendMsgPopCtrl
                            reviewerId: function () {
                                return reviewerId;
                            },
                            reviewerName: function () {
                                return reviewerName;
                            }
                        }
                    }
                );
            }
            else {
                //record this page's url in a variable so that after login user can be redirected back to this page
                $rootScope.previousUrl = $location.path();
                $location.url("/login");
            }

        }

        function openReplyPop(review) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'views/search/docReplyPop.view.html',
                    controller: 'DocReplyPopCtrl as model',
                    resolve: {
                        review: function () {
                            return review;
                        }
                    }
                }
            );

            modalInstance.result.then(
                //function to be called after the openReplyPop is auto closed;
                function () {
                    ReviewService
                        .findReviewByDoctorId(vm.uid)
                        .then(
                            function (response) {
                                vm.reviews = response.data;
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                }
            );
        }

        function openVerifPop() {
            $uibModal.open(
                {
                    templateUrl: 'views/search/docVerifPop.view.html',
                    controller: 'DocVerifPopCtrl as model',
                    resolve: {
                        doctorUid: function () {
                            return vm.uid;
                        },
                        doctorName: function () {
                            var doctorName = vm.data.profile.last_name;
                            return doctorName;
                        }
                    }
                }
            );
        }
    }
})();
