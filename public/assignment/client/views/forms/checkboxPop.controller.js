(function () {
    angular
        .module("FormBuilderApp")
        .controller("CheckboxPopCtrl", CheckboxPopCtrl);

    function CheckboxPopCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function close() {
            $uibModalInstance.close();
        }
    }
})();