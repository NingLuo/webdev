(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController)
        .controller("WarningPopCtrl", WarningPopCtrl);

    function MainController ($location, $rootScope, UserService, LocationService, $uibModal) {
        var vm = this;
        vm.search = search;

        function init() {
            if($rootScope.currentUser) {
                UserService.setCurrentUser($rootScope.currentUser);
            }
        }
        init();

        function search (specialty, zipCode, insurance, gender, name) {
            //used for storing lat and lng of user-entered zipcode
            var geolocation = null;
            var insurance   = null;
            var gender      = null;
            var doctorName  = null;

            if(zipCode && specialty) {
                //change zip code to geolocation using google api
                LocationService
                    .getGeolocation(zipCode)
                    .then(
                        function (response) {
                            geolocation = response.data.results[0].geometry.location;
                            geolocation = geolocation.lat + "," + geolocation.lng + ",40";
                            $location.url('/result/specialty/' + specialty + '/geolocation/' + geolocation + '/zipCode/' + zipCode + '/insurance/' + insurance + '/gender/'+ gender + '/name/' + doctorName);

                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            } else {
                $uibModal.open(
                    {
                        templateUrl: 'views/main/warningPop.view.html',
                        controller: "WarningPopCtrl as model"
                    }
                );
            }
        }
    }


    function WarningPopCtrl($uibModalInstance) {
        var vm = this;
        vm.close = close;

        function close() {
            $uibModalInstance.dismiss();
        }
    }
})();