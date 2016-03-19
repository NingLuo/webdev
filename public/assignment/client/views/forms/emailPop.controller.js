(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("EmailPopCtrl", EmailPopCtrl);

    function EmailPopCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function () {
            $uibModalInstance.close();
        }
    }
})();