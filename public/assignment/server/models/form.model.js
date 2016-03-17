var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
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

    function findFormsByUserId(userId) {
        var forms = [];
        for(var i in mock) {
            if(mock[i].userId == userId) {
                forms.push(mock[i]);
            }
        }

        return forms;
    }

    function createForm(userId, form) {
        form._id = uuid.v4();
        form.userId = userId;
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

        return mock;
    }
}