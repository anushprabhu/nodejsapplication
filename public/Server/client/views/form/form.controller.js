(function() {
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        function init() {
            console.log("Initializing forms for " + $rootScope.currentId);
            FormService.findAllFormsForUser($rootScope.currentId)
                .then(function(forms){
                   model.forms = forms;
                });
        }
        init();

        function addForm(){
            var formObj = { userId: $rootScope.currentId, title: model.title };
            FormService.createForm($rootScope.currentId, formObj)
                .then(function(newForm){
                    model.form = newForm;
                    model.forms.push(model.form);
                });
        }

        function updateForm() {
            var formObj = { id: model.form.id, title: model.title };
            FormService.updateForm(model.form.id, formObj)
                .then(function(forms){
                    model.forms = forms;
                });
        }

        function deleteForm(formId) {
            FormService.deleteForm(formId)
                .then(function(forms){
                    model.forms = forms;
                });
        }

        function selectForm(formId) {
            FormService.findFormById(formId)
                .then(function(form){
                    model.title = form.title;
                    model.form = form;
                });
        }


    }
})();
