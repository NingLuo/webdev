module.exports = function (app, model) {
    var formModel = require("./../models/form.model.js");

    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function getFormsByUserId(req, res) {
        var userId = req.params.userId;
        var forms = model.findFormsByUserId(userId);
        res.json(forms);
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var restForms = model.deleteForm(formId);
        res.json(restForms);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        var forms = model.createForm(userId, newForm);
        res.json(forms);
    }

    function updateForm() {
        
    }
}
