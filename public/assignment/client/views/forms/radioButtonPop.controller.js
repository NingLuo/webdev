(function () {
    angular
        .module("FormBuilderApp")
        .controller("RadioButtonPopCtrl", RadioButtonPopCtrl);

    function RadioButtonPopCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();