(function () {
    angular
        .module("FormBuilderApp")
        .controller("DatePopCtrl", DatePopCtrl);

    function DatePopCtrl($uibModalInstance) {
        var vm = this;

        vm.close = function close() {
            $uibModalInstance.close();
        }
    }
})();