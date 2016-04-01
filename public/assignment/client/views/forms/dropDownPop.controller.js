(function () {
    angular
        .module("FormBuilderApp")
        .controller("DropDownPopCtrl", DropDownPopCtrl);

    function DropDownPopCtrl($uibModalInstance, field, formId, FieldService) {
        var vm = this;

        vm.field = field;
        vm.update = update;
        vm.close = close;
        vm.optStr = "";

        //Convert option objects to a string
        for(var i in field.options)
        {
            vm.optStr = vm.optStr.concat(field.options[i].label);
            vm.optStr = vm.optStr.concat(":");
            vm.optStr = vm.optStr.concat(field.options[i].value);
            vm.optStr = vm.optStr.concat("\n");
        }

        function update() {
            var optArray = vm.optStr.split("\n");
            for(var i in field.options)
            {
                opt = optArray[i].split(":");
                vm.field.options[i].label = opt[0];
                vm.field.options[i].value = opt[1];
            }

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