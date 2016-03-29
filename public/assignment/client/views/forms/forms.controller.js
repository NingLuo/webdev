(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        var vm = this;
        var currentUserId = $rootScope.currentUser._id;
        var renderForms = renderForms;

        // event handler declarations
        vm.createForm = createForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init() {
            FormService
                .findFormsByUserId(currentUserId)
                .then(function (response) {
                    renderForms(response.data);
                })
        }
        init();


        function renderForms(userForms) {
            vm.currentUserForms = userForms;
        }

        function createForm(newForm) {
            FormService
                .createForm(currentUserId, newForm)
                .then(function (response) {
                    return FormService.findFormsByUserId(currentUserId)
                })
                .then(function (response) {
                    var forms = response.data;
                    renderForms(forms);
                    vm.newForm = {};
                });
        }

        function updateForm(newForm) {
            FormService
                .updateFormById(newForm._id, newForm)
                .then(function () {
                    FormService
                        .findFormsByUserId(currentUserId)
                        .then(function (response) {
                            var forms = response.data;
                            renderForms(forms);
                            vm.newForm = {};
                        })
                });
        }

        function deleteForm(formId) {
            FormService
                .deleteFormById(formId)
                .then(function (response) {
                    FormService
                        .getAllForms(currentUserId)
                        .then(function (response) {
                            var forms = response.data;
                            renderForms(forms);
                        })

                });
        }

        function selectForm(form) {
            vm.newForm = {
                "_id": form._id,
                "title": form.title,
                "userId": form.userId
            };
        }
    }
})();