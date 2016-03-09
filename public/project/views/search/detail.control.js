(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService, UserService, $location, $rootScope) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addFavorite = addFavorite;
        vm.rate = rate;
        vm.addSuccess = false;    //a boolean variable controlling the show and hide of success alert in view

        function init() {
            //find and render the doctor detail of which the user wants
            //DoctorSearchService
            //    .findDoctorByUid(vm.uid)
            //    .then(function(response) {
            //        console.log("data retrieved success");
            //        vm.data = response.data;
            //        $rootScope.currentDoctor = response.data.data;
            //    });

            for(var i=0; i<$rootScope.currentDoctors.length; i++) {
                if(vm.uid === $rootScope.currentDoctors[i].uid) {
                    vm.data = $rootScope.currentDoctors[i];
                }
            }
        };
        init();


        function addFavorite() {
            //check if user has logged in
            if($rootScope.currentUser) {
                vm.addSuccess = UserService.addFavoriteByUid($rootScope.currentUser.u_id ,vm.uid);
            } else {
                //if user is not logged in, redirect to login page
                $location.url('/login');
            }
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
    }
})();
