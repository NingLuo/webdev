var uuid = require('node-uuid');

module.exports = function (app, formModel, fieldModel) {
    //var formModel = require("./../models/form.model.js");

    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/fields/", updateFields);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel
            .findFieldsByFormId(formId)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function findFieldByFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var field = {};

        for(var i in form.fields) {
            if(form.fields[i]._id == fieldId) {
                field = form.fields[i];
                break;
            }
        }

        res.json(field);
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteField(formId, fieldId)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        fieldModel
            .createField(formId, newField)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        //var form = formModel.findFormById(formId);
        fieldModel
            .updateField(formId, fieldId, newField)
            .then(
                function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function updateFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel
            .updateFields(formId, fields)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    console.log(err);
                }
            );
    }
};
