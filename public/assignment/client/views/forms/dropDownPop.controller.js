(function () {
    angular
        .module("FormBuilderApp")
        .controller("DropDownPopCtrl", DropDownPopCtrl);

    function DropDownPopCtrl($uibModalInstance, field, formId, FieldService) {
        var vm = this;

        vm.field = field;
        vm.update = update;

        vm.close = function close() {
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