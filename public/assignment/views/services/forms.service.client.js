(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback) {

            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);

        }

        function findAllFormsForUser(userId, callback) {

            var userForms = [];
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);

        }

        function deleteFormById(formId, callback) {

            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i, 1);
                    callback(forms);
                    return;
                }
            }
        }

        function updateFormById(formId, newForm, callback) {

            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;
                    callback(forms[i]);
                    return;
                }
            }
        }
    }
})();