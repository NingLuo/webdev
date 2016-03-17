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
        vm.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function init() {
            FormService
                .getAllForms(currentUserId)
                .then(function (response) {
                    renderForms(response.data);
                })
        }
        init();


        function renderForms(userForms) {
            vm.currentUserForms = userForms;
        }

        function addForm(newForm) {
            console.log(newForm.title);
            FormService
                .addForm(currentUserId, newForm)
                .then(function (response) {
                    FormService
                        .getAllForms(currentUserId)
                        .then(function (response) {
                            var forms = response.data;
                            renderForms(forms);
                            vm.newForm = {};
                        })
                });
        }

        function updateForm(newForm) {
            FormService.updateFormById(newForm._id, newForm, callback);
            function callback(updatedForm) {
                $scope.newForm = {};
            }

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

        function selectForm(index) {
            $scope.newForm = {
                "_id": $scope.currentUserForms[index]._id,
                "title": $scope.currentUserForms[index].title,
                "userId": $scope.currentUserForms[index].userId
            };
        }
    }
})();