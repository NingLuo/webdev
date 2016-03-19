(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("MultipleLineCtrl", MultipleLineCtrl);

    function MultipleLineCtrl($uibModalInstance, field, formId, FieldService) {
        var vm = this;

        vm.field = field;
        vm.update = update;

        vm.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function update() {
            FieldService
                .updateField(formId, field._id, vm.field)
                .then(function (response) {
                    $uibModalInstance.close(response);
                })
        }
    }
})();