(function () {
    "user strict";

    angular
        .module("FindDoctorApp")
        .controller("MainController", MainController)
        .controller("WarningPopCtrl", WarningPopCtrl);

    function MainController ($location, $rootScope, UserService, $uibModal) {
        var vm = this;
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