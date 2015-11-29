var forms = require('./form.mock.json');
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(app) {
    var api = {
        createForm: createForm,
        findAllForm: findAllForm,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormsByTitle: findFormsByTitle,
        findAllFormsByUserId: findAllFormsByUserId
    };
    return api;

    /* Basic CRUD operations */

    function createForm(newForm) {
        console.log("Creating new form " + newForm);
        var deferred = q.defer();
        console.log(newForm);
        forms.push(newForm);
        deferred.resolve(newForm);
        return deferred.promise;
    }

    function findAllForm() {
        var deferred = q.defer();
        deferred.resolve(forms);
        return deferred.promise;
    }

    function findFormById(formId) {
        console.log("Fetching form with "+formId);
        var deferred = q.defer();
        var findForm = getFormByFormId(formId);
        deferred.resolve(findForm);
        return deferred.promise;
    }

    function updateForm(formId, formToUpdate) {
        console.log("Updating form [" + formId+ "] with " + formToUpdate);
        var deferred = q.defer();

        var userForms = [];
        var form = getFormByFormId(formId);
        if(form != null) {
            form.title = formToUpdate.title;
            userForms = getUserForms(form.userId);
        }
        else {
            console.log("No matching form found with id " + formId + ". Skipping update.");
        }

        deferred.resolve(userForms);
        return deferred.promise;
    }

    function deleteForm(formId) {
        console.log("Deleting form with ["+formId+"]");
        var deferred = q.defer();

        var userForms = [];
        var form = getFormByFormId(formId);
        if(form != null) {
            forms.splice(form, 1);
            userForms = getUserForms(form.userId);
        }
        else {
            console.log("No matching form found with id " + formId + ". Skipping update.");
        }

        deferred.resolve(userForms);
        return deferred.promise;
    }

    /* Form model specific operations */

    function findFormsByTitle(title) {
        console.log("Fetching form with title ["+title+"].");
        var deferred = q.defer();

        for(var form in forms) {
            if(forms[form].title.localeCompare(title) == 0) {
                console.log("Found form!");
                deferred.resolve(forms[form]);
                break;
            }
        }

        return deferred.promise;
    }

    function findAllFormsByUserId(userId) {
        console.log("Fetching forms with user id [" + userId + "]");
        var deferred = q.defer();
        deferred.resolve(getUserForms(userId));
        return deferred.promise;
    }

    /* Private helper methods */

    function getUserForms(userId) {
        console.log("Fetching form with user id ["+userId+"].");
        var userForms = [];
        for(var form in forms) {
            if(forms[form].userId == userId) {
                userForms.push(forms[form]);
            }
        }

        return userForms;
    }

    function getFormByFormId(formId) {
        console.log("Fetching form with id ["+formId+"].");
        var findForm = null;
        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
                console.log("Found form!");
                findForm = forms[form];
                break;
            }
        }

        return findForm;
    }
}