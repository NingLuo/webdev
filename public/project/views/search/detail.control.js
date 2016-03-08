(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService, UserService, $location, $rootScope) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addFavorite = addFavorite;
        vm.rate = rate;

        function init() {
            //find and render the doctor detail of which the user wants
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    console.log("data retrieved success");
                    vm.data = response.data;
                });
        };
        init();


        function addFavorite() {
            //check if user has logged in
            if($rootScope.currentUser) {
                UserService.addFavoriteByUid($rootScope.currentUser.u_id ,vm.uid);
            } else {
                //if user is not logged in, redirect to login page
                $location.url('/login');
            }
        }

        function rate() {
            //check if user has logged in
            if($rootScope.currentUser ) {
                $location.url('/rate/'+vm.data.data.uid);
            } else {
            //if user is not logged in, redirect to login page
                $location.url('/login');
            }
        }
    }
})();
