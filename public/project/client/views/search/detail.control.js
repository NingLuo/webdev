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
        vm.addSuccess = false;    //a boolean variable controlling the show and hide of success alert in view

        function init() {
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    vm.data = response.data.data;
                    return ReviewService.findReviewByDoctorId(vm.uid);
                })
                .then(
                    function (response) {
                        vm.reviews = response.data;
                        console.log(vm.reviews);
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
    }
})();
