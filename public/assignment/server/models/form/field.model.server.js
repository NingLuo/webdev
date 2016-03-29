//var mongoose = require("mongoose");
//var FieldSchema = require("./field.schema.server.js");

module.exports = function (formModel) {

    var Form = formModel.getMongooseModel();
    //var Field = mongoose.model('Field', FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        createField: createField
    };
    return api;

    function findFieldsByFormId(formId) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    return form.fields;
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function createField(formId, newField) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.push(newField);
                    return form.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};
