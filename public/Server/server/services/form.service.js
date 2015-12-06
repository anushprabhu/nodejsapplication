var model = require("../models/form.model.js")();

module.exports = function(app) {
    app.get("/api/server/form", findAllForms);
    app.put("/api/server/form/:formId", updateForm);
    app.delete("/api/server/form/:formId", deleteForm);
    app.get("/api/server/form/:formId", findFormById);
    app.get("/api/server/user/:userId/form", findAllFormsForUser);
    app.post("/api/server/user/:userId/form", createNewForm);

    function createNewForm(req, res) {
        console.log("Post request createNewForm.");
        var form = req.body;
        model
            .createForm(form)
            .then(function(newForm){
                res.json(newForm);
            });
    }

    function findAllFormsForUser(req, res){
        console.log("Get request to fetch all forms.");
        var userId = req.params.userId;
        model
            .findAllFormsByUserId(userId)
            .then(function(forms){
                res.json(forms);
            });
    }

    function findFormById(req, res){
        console.log("Get request to fetch form by id.");
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function(form){
                res.json(form);
            });
    }

    function findAllForms(req, res){
        console.log("Get request to find all forms.");
        model
            .findAllForms()
            .then(function(forms){
                res.json(forms);
            });
    }

    function updateForm(req, res) {
        console.log("Put request to update form.");
        var formId = req.params.formId;
        var formObj = req.body;
        model
            .updateForm(formId, formObj)
            .then(function(form){
                res.json(form);
            });
    }

    function deleteForm(req, res) {
        console.log("Delete request to delete Form.");
        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function(forms){
                res.json(forms);
            });
    }

};