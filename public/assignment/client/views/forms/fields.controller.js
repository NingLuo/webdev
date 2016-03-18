(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, UserService, $routeParams) {
        var vm = this;
        var formId;
        vm.fields = {};
        vm.addField = addField;

        function init() {
            formId = $routeParams.formId;
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    vm.fields = response.data;
                    console.log(vm.fields);
                })
        }
        init();

        function addField(fieldType) {
            console.log("addField");
        }
    }
})();