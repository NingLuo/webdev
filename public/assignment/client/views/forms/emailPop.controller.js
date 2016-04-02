(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("EmailPopCtrl", EmailPopCtrl);

    function EmailPopCtrl($uibModalInstance, field, formId, FieldService) {
        var vm = this;

        vm.field = field;
        vm.update = update;
        vm.close = close;

        function update() {
            FieldService
                .updateField(formId, field._id, vm.field)
                .then(function (response) {
                    $uibModalInstance.close(response);
                });
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();