(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var api = {
            createForm: createForm,
            findFormsByUserId: findFormsByUserId,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;


        function createForm(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findFormsByUserId(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();