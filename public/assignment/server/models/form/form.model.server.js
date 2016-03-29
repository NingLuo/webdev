var mongoose = require("mongoose");
module.exports = function () {
    var formSchema = require("./form.schema.server.js")();
    var Form = mongoose.model('Form', formSchema);

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        updateFormById:updateFormById
    };
    return api;

    function createForm(newForm) {
        return Form.create(newForm);
    }

    function findFormsByUserId(userId) {
        return Form.find({"userId": userId});
    }

    function updateFormById(formId, newForm) {
        return Form.update({"_id": formId}, newForm);
    }
};