(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, UserService, $routeParams, $uibModal) {
        var vm = this;
        var formId;
        vm.fields = {};
        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.openSingleLine = openSingleLine;
        vm.openMultiLine = openMultiLine;
        vm.openDate = openDate;
        vm.openDropDownPop = openDropDownPop;
        vm.openEmailPop = openEmailPop;

        function init() {
            formId = $routeParams.formId;
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    renderFields(response.data);
                })
        }
        init();

        function renderFields(fields) {
            vm.fields = fields;
        }

        function addField(fieldType) {
            var field;
            switch (fieldType) {
                case "Single Line Text Field":
                    console.log("Single Line");
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "Multi Line Text Field":
                    console.log("Multi Line");
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "Date Field":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "Dropdown Field":
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
                default:
                    console.log("empty field");
                    break;
            }
            console.log(field);

            FieldService
                .createFieldForForm(formId, field)
                .then(function (response) {
                    renderFields(response.data);
                })
        }

        function deleteField(fieldId) {
            console.log("deleteField " + fieldId);
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    renderFields(response.data);
                })
        }

        function openSingleLine() {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'views/forms/singleLinePop.view.html',
                    controller: 'SingleLineCtrl as model'
                }
            );
        }

        function openMultiLine() {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: "views/forms/multipleLinePop.view.html",
                    controller: 'MultipleLineCtrl as model'
                }
            )
        }

        function openDate() {
            $uibModal.open(
                {
                    templateUrl: "views/forms/datePop.view.html",
                    controller: "DatePopCtrl as model"
                }
            )
        }

        function openDropDownPop() {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: "views/forms/dropDownPop.view.html",
                    controller: 'DropDownPopCtrl as model'
                }
            )
        }

        function openEmailPop() {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: "views/forms/emailPop.view.html",
                    controller: 'EmailPopCtrl as model'
                }
            )
        }
    }
})();