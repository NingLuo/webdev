(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController);

    function MainController ($location, $rootScope, UserService) {

        var vm = this;
        vm.illegal = false;
        vm.search = search;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $rootScope.currentUser = currentUser;
                    }
                });
        }
        init();

        function search (specialty, location, insurance, gender, name) {
            if(location && specialty) {
                $location.url('/result/specialty/' + specialty + '/location/' + location +'/insurance/' + insurance + '/gender/'+gender+'/name/'+name);
            } else {
                console.log("Both city and specilty are required");
                vm.illegal = true;
            }
        }
    }
})();