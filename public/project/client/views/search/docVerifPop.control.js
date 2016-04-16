(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("DocVerifPopCtrl", DocVerifPopCtrl);

    function DocVerifPopCtrl($uibModalInstance, doctorUid) {
        var vm = this;
        vm.verifyUid = verifyUid;
        vm.uidVerifFailed = false;

        function verifyUid(uid) {
            if(doctorUid == uid) {
                //create a provider account
            }
            else {
                vm.uidVerifFailed = true;
            }
        }

        vm.close = function () {
            $uibModalInstance.dismiss();
        };
    }
})();
