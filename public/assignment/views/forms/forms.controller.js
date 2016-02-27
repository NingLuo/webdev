(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {

        var currentUserId = $rootScope.currentUser._id;

        FormService.findAllFormsForUser(currentUserId, renderForms);



        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;



        function renderForms(userForms) {

            $scope.currentUserForms = userForms;

        }

        function addForm(newForm) {

            FormService.createFormForUser(currentUserId, newForm, callback);

            function callback(form) {

                console.log("Added Form: " + form.title + " for " + currentUserId);
                FormService.findAllFormsForUser(currentUserId, renderForms);
                $scope.newForm = {};

            }
        }

        function updateForm() {
            console.log("Update Form");
        }

        function deleteForm() {
            console.log("delete Form");
        }

        function selectForm() {
            console.log("select Form");
        }
    }
})();