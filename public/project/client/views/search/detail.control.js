(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService, UserService, DoctorService, ReviewService, $location, $rootScope, $uibModal) {
        var vm = this;
        vm.uid = $routeParams.uid;   //this doctor's universal id
        vm.addFavorite = addFavorite;
        vm.unfavorite = unfavorite;
        vm.rate = rate;
        vm.viewInsurance = viewInsurance;
        vm.reviews;
        vm.openMsgPop = openMsgPop;
        vm.openReplyPop = openReplyPop;
        vm.openVerifPop = openVerifPop;
        vm.isFavorited = false;

        vm.addSuccess = false;    //a boolean variable controlling the show and hide of success alert in view

        function init() {
            console.log(vm.uid);
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    vm.data = response.data.data;
                    //check if user has liked this provider
                    if($rootScope.currentUser) {
                        UserService
                            .checkFavorite($rootScope.currentUser._id, vm.uid)
                            .then(
                                function (response) {
                                    if(response.data) {
                                        vm.isFavorited = true;
                                    }
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );
                    }
                    //fetch reviews for this provider
                    return ReviewService.findReviewByDoctorId(vm.uid);
                })
                .then(
                    function (response) {
                        //add no review console.log
                        vm.reviews = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();

        function addFavorite() {
            if($rootScope.currentUser ) {
                UserService
                    .addFavoriteByUid($rootScope.currentUser._id ,vm.uid)
                    .then(function () {
                        return DoctorService.addFavoritedBy(vm.uid, $rootScope.currentUser._id);
                    })
                    .then(function (res) {
                        vm.addSuccess = true;
                        vm.isFavorited = true;
                    });
            } else {
                //if user is not logged in, redirect to login page
                $rootScope.previousUrl = $location.path();
                $location.url('/login');
            }
        }

        function unfavorite() {
            UserService
                .unfavorite($rootScope.currentUser._id, vm.uid)
                .then(
                    function (response) {
                        vm.isFavorited = false;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        function rate() {
            //check if user has logged in
            if($rootScope.currentUser ) {
                $location.url('/rate/'+vm.data.uid);
            } else {
            //if user is not logged in, redirect to login page
                $rootScope.previousUrl = $location.path();
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

                modalInstance.result.then(
                    function () {
                        var modalInstance2 = $uibModal.open(
                            {
                                templateUrl: 'views/search/msgSentSuccess.view.html',
                                size: 'sm'
                            }
                        );
                    },
                    function () {
                        $log.info('Modal dismissed at: ' + new Date());
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
