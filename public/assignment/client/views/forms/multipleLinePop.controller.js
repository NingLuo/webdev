(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("MultipleLineCtrl", MultipleLineCtrl);

    function MultipleLineCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function () {
            $uibModalInstance.close();
        }
    }
})();