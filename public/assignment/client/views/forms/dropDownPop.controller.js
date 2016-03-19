(function () {
    angular
        .module("FormBuilderApp")
        .controller("DropDownPopCtrl", DropDownPopCtrl);

    function DropDownPopCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function close() {
            $uibModalInstance.close();
        }
    }
})();