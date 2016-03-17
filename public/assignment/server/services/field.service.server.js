var uuid = require('node-uuid');

module.exports = function (app, formModel) {
    //var formModel = require("./../models/form.model.js");

    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;

        res.json(fields);
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
        var form = formModel.findFormById(formId);

        for(var i in form.fields) {
            if(form.fields[i]._id == fieldId) {
                form.fields.splice(i, 1);
            }
        }

        res.json(form);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        var form = formModel.findFormById(formId);

        field._id = uuid.v4();
        form.fields.push(newField);

        res.json(form.fields);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var form = formModel.findFormById(formId);

        for(var i in form.fields) {
            if(form.fields[i]._id == fieldId) {
                form.fields[i].label = newField.label;
                form.fields[i].type = newField.type;
                form.fields[i].placeholder = newField.placeholder;
                break;
            }
        }

        res.json(form.fields);
    }
}
