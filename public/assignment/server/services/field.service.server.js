module.exports = function (app) {
    var formModel = require("./../models/form.model.js");

    app.get("/api/assignment/form/:formId/field", findFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
}
