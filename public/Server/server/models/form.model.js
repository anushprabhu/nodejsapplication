var forms = require('./form.mock.json');
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(app) {
    var api = {
        /* Form operations */
        createForm: createForm,
        findAllForm: findAllForm,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormsByTitle: findFormsByTitle,
        findAllFormsByUserId: findAllFormsByUserId,
        /* Field operations */
        findAllFieldsByFormId: findAllFieldsByFormId,
        findFieldById: findFieldById,
        createField: createField,
        updateField: updateField,
        deleteField: deleteField
    };
    return api;

    /* Basic CRUD operations */

    function createForm(newForm) {
        console.log("Creating new form " + newForm);
        var deferred = q.defer();
        newForm.id = uuid.v1();
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

        var userId = null;
        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
                console.log("Found form to be deleted.");
                userId = forms[form].userId;
                forms.splice(form, 1);
                break;
            }
        }

        var userForms = [];
        if(userId != null) {
            userForms = getUserForms(userId);
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


    /* Field CRUD operations */

    function findFieldById(formId, fieldId) {
        console.log("Fetching form field with form id [" + formId  + "] and field id [" + fieldId + "]");
        var deferred = q.defer();

        var formField = fetchFieldById(formId, fieldId);
        deferred.resolve(formField);
        return deferred.promise;
    }

    function createField(formId, fieldObj) {
        console.log("Creating new field for formId [" + formId + "]");
        var deferred = q.defer();

        fieldObj.id = uuid.v1();
        console.log("Creating new field for formId [" + formId + "] with field id [" + fieldObj.id + "]");
        var form = getFormByFormId(formId);
        var allFields = null;
        if(form != null) {
            allFields = form.fields;
            if(typeof allFields !== "undefined") {
                allFields.push(fieldObj);
            } else {
                allFields = [];
                allFields.push(fieldObj);
                form.fields = allFields;
            }
        }
        else {
            console.log("Could not retrieve form. Failed to create field.");
        }

        deferred.resolve(allFields);
        return deferred.promise;
    }

    function updateField(formId, fieldId, fieldObj) {
        console.log("Updating field for formId [" + formId + "] with field Id [" + fieldId + "]");
        var deferred = q.defer();

        var formField = fetchFieldById(formId, fieldId);
        formField.label = fieldObj.label;
        if (formField.type.localeCompare(fieldObj.type) == 0) {
           switch (formField.type) {
               case "OPTIONS" :
               case "CHECKBOXES" :
               case "RADIOS" :
                   formField.options = fieldObj.options;
                   break;
               default :
                   formField.placeholder = fieldObj.placeholder;
           }
        }

        deferred.resolve(formField);
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        console.log("Deleting field for formId [" + formId + "] with field Id [" + fieldId + "]");
        var deferred = q.defer();
        var form = getFormByFormId(formId);
        var formFields = form.fields;
        for (var fieldIndex in formFields) {
            if(formFields[fieldIndex].id == fieldId) {
                console.log("Found matching field to delete.");
                form.fields.splice(fieldIndex, 1);
                break;
            }
        }

        deferred.resolve(form.fields);
        return deferred.promise;
    }

    /* Additional Field operations */

    function findAllFieldsByFormId(formId) {
        console.log("Fetching form fields with form id [" + formId  + "]");
        var deferred = q.defer();
        var allFields;
        for(var form in forms) {
            if(forms[form].id.localeCompare(formId) == 0) {
                allFields = forms[form].fields;
                break;
            }
        }

        deferred.resolve(allFields);
        return deferred.promise;
    }

    function fetchFieldById(formId, fieldId) {
        var formField;
        var form = getFormByFormId(formId);
        if(form != null) {
            var allFields = form.fields;
            for(var fieldIndex in allFields) {
                if(allFields[fieldIndex].id.localeCompare(fieldId) == 0) {
                    formField = allFields[fieldIndex];
                    break;
                }
            }
        }
        else {
            console.log("Could not fetch form. Failed to fetch field by id.");
        }

        return formField;
    }
}