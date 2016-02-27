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

        function updateForm(newForm) {

            FormService.updateFormById(newForm._id, newForm, callback);

            function callback(updatedForm) {

                console.log("Updated Form: " + updatedForm.title);
                $scope.newForm = {};

            }

        }

        function deleteForm() {
            console.log("delete Form");
        }

        function selectForm(index) {

            $scope.newForm = {

                "_id": $scope.currentUserForms[index]._id,
                "title": $scope.currentUserForms[index].title,
                "userId": $scope.currentUserForms[index].userId

            };

            console.log("select Form: " + $scope.currentUserForms[index].title);
        }
    }
})();