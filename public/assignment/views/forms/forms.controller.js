(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        var currentUserId = $rootScope.currentUser._id;
        var renderForms = renderForms;

        // event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        activate();

        function activate() {
            FormService.findAllFormsForUser(currentUserId, renderForms);
        }

        function renderForms(userForms) {
            $scope.currentUserForms = userForms;
        }

        // event handler implementation
        function addForm(newForm) {
            FormService.createFormForUser(currentUserId, newForm, callback);
            function callback(form) {
                FormService.findAllFormsForUser(currentUserId, renderForms);
                $scope.newForm = {};
            }
        }

        function updateForm(newForm) {
            FormService.updateFormById(newForm._id, newForm, callback);
            function callback(updatedForm) {
                $scope.newForm = {};
            }

        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.currentUserForms[index]._id, callback);
            FormService.findAllFormsForUser(currentUserId, renderForms);
            function callback(forms) {}
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