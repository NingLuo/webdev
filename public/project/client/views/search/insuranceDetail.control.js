(function () {
    angular
        .module("FindDoctorApp")
        .controller("InsuranceDetailCtrl", InsuranceDetailCtrl);

    function InsuranceDetailCtrl($uibModalInstance, insuranceList) {
        var vm = this;
        vm.insuranceList = insuranceList;

        vm.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();