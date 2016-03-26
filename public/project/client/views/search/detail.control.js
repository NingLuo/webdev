(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService, UserService, DoctorService, $location, $rootScope) {
        var vm = this;
        vm.uid = $routeParams.uid;   //this doctor's universal id
        vm.addFavorite = addFavorite;
        vm.rate = rate;
        vm.addSuccess = false;    //a boolean variable controlling the show and hide of success alert in view

        function init() {
            //find and render the doctor detail of which the user wants
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    vm.data = response.data.data;
                    console.log(vm.data);
                    $rootScope.currentDoctor = response.data.data;
                });
        }
        init();

        function addFavorite() {
            //check if the user has logged in
            if($rootScope.currentUser) {
                UserService
                    .addFavoriteByUid($rootScope.currentUser.u_id ,vm.uid)
                    .then(function (res) {
                        vm.addSuccess = true;
                    });
                DoctorService
                    .addFavoriteUserById(vm.uid, $rootScope.currentUser.u_id)
                    .then(function (res) {
                        console.log("doctor side now knows this user");
                    });
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
