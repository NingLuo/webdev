var mongoose = require("mongoose");
module.exports = function () {
    var formSchema = require("./form.schema.server.js")();
    var Form = mongoose.model('Form', formSchema);

    var api = {
        createForm: createForm,
        findFormsByUserId: findFormsByUserId,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormById: findFormById,
        getMongooseModel: getMongooseModel
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

    function deleteFormById(formId) {
        return Form.remove({"_id": formId});
    }

    //如果证明不被field需要可以删除这个方法
    function findFormById(formId) {
        return Form.findById(formId);
    }

    function getMongooseModel() {
        return Form;
    }
};