(function () {
    angular
        .module("FindDoctorApp")
        .controller("DetailCtrl", DetailCtrl);

    function DetailCtrl ($routeParams, DoctorSearchService) {
        console.log("hello from detail Ctrl");
        var vm = this;
        vm.uid = $routeParams.uid;

        function init() {
            DoctorSearchService
                .findDoctorByUid(vm.uid)
                .then(function(response) {
                    console.log("data retrieved success");
                    vm.data = response.data;
                });
        };
        init();
    }
})();
