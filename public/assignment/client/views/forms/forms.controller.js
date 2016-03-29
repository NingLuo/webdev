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
                .then(
                    function (success) {
                        return FormService.findFormsByUserId(currentUserId);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        var forms = response.data;
                        renderForms(forms);
                        vm.newForm = {};
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function updateForm(newForm) {
            FormService
                .updateFormById(newForm._id, newForm)
                .then(
                    function () {
                        return FormService.findFormsByUserId(currentUserId);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        var forms = response.data;
                        renderForms(forms);
                        vm.newForm = {};
                    },
                    function (err) {
                        console.log(err);
                    }
                )
        }

        function deleteForm(formId) {
            FormService
                .deleteFormById(formId)
                .then(
                    function (success) {
                        return FormService.findFormsByUserId(currentUserId);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        var forms = response.data;
                        renderForms(forms);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
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