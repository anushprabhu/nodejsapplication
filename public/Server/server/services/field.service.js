var model = require("../models/form.model.js")();

module.exports = function(app) {
    app.get("/api/server/form/:formId/field", findAllFieldsByFormId);
    app.get("/api/server/form/:formId/field/:fieldId", findFieldById);

    app.post("/api/server/form/:formId/field", createField);
    app.put("/api/server/form/:formId/field/:fieldId", updateField);
    app.delete("/api/server/form/:formId/field/:fieldId", deleteField);

    function createField(req, res) {
        console.log("Post request createField.");
        var formId = req.params.formId;
        var field = req.body;
        model
            .createField(formId, field)
            .then(function(newField){
                res.json(newField);
            });
    }

    function findAllFieldsByFormId(req, res){
        console.log("Get request to fetch all fields.");
        var formId = req.params.formId;
        model
            .findAllFieldsByFormId(formId)
            .then(function(fields){
                res.json(fields);
            });
    }

    function findFieldById(req, res){
        console.log("Get request to fetch field by id.");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldById(formId, fieldId)
            .then(function(form){
                res.json(form);
            });
    }

    function updateField(req, res) {
        console.log("Put request to update field.");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldObj = req.body;
        model
            .updateField(formId, fieldId, fieldObj)
            .then(function(field){
                res.json(field);
            });
    }

    function deleteField(req, res) {
        console.log("Delete request to delete Field.");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteField(formId, fieldId)
            .then(function(fields){
                res.json(fields);
            });
    }

};