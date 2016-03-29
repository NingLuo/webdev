module.exports = function (app, formModel) {
    //var formModel = require("./../models/form.model.js");

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findFormsByUserId(userId)
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(
                function (success) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        newForm.userId = userId;
        formModel
            .createForm(newForm)
            .then(
                function (form) {
                    res.json(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        formModel
            .updateFormById(formId, newForm)
            .then(
                function () {
                    res.json(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};
