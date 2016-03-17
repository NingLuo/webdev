(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            addForm: addForm,
            getAllForms: getAllForms,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        //////////////////////////

        function addForm(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function getAllForms(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
            //var userForms = [];
            //for(var i = 0; i < forms.length; i++) {
            //    if(forms[i].userId == userId) {
            //        userForms.push(forms[i]);
            //    }
            //}
            //callback(userForms);
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
            //for(var i = 0; i < forms.length; i++) {
            //    if(forms[i]._id == formId) {
            //        forms[i].title = newForm.title;
            //        forms[i].userId = newForm.userId;
            //        callback(forms[i]);
            //        return;
            //    }
            //}
        }
    }
})();