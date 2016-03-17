var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        findFormByTitle: findFormByTitle,
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function findFormByTitle(title) {
        for(var i in mock) {
            if(mock[i].title == title) {
                return mock[i];
            }
        }
        return null;
    }

    function createForm(form) {
        mock.push(form);
        return mock;
    }

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                return mock[i];
            }
        }
        return null;
    }

    function updateForm(formId, newForm) {
        var form = findFormById(formId);
        form = {
            "_id": newForm._id,
            "title": newForm.title,
            "userId": newForm.userId,
            "fields": newForm.fields
        }
    }

    function deleteForm(formId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                mock.splice(i, 1);
            }
        }
    }
}