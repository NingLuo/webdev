//var mongoose = require("mongoose");
//var FieldSchema = require("./field.schema.server.js");

module.exports = function (formModel) {

    var Form = formModel.getMongooseModel();
    //var Field = mongoose.model('Field', FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        createField: createField,
        deleteField: deleteField,
        updateField: updateField,
        updateFields: updateFields
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

    function deleteField(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.id(fieldId).remove();
                    return form.save();
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function updateField(formId, fieldId, newField) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    var field = form.fields.id(fieldId);
                    field.label = newField.label;
                    field.placeholder = newField.placeholder;
                    field.options = newField.options;
                    return form.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function updateFields(formId, newFields) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields = newFields;
                    return form.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};
