(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SingleLineCtrl", SingleLineCtrl);

    function SingleLineCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function () {
            $uibModalInstance.close();
        }
    }
})();