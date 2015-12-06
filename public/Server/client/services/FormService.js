(function() {
    'user strict';
    angular
        .module("FormBuilderServerApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var api = {
            createForm: createForm,
            findAllFormsForUser: findAllFormsForUser,
            updateForm: updateForm,
            deleteForm: deleteForm,
            findFormById: findFormById
        };

        return api;

        function createForm(userId, form) {
            var deferred = $q.defer();
            $http.post("/api/server/user/" + userId + "/form", form)
                .success(function(newForm) {
                    deferred.resolve(newForm);
                });

            return deferred.promise;
        }

        function updateForm(formId, newForm) {
            var deferred = $q.defer();

            $http.put("/api/server/form/" + formId, newForm)
                .success(function(form){
                    deferred.resolve(form);
                });

            return deferred.promise;
        }

        function deleteForm(formId) {
            var deferred = $q.defer();
            $http.delete("/api/server/form/"+ formId)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function findFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/server/form/"+ formId)
                .success(function(form){
                    deferred.resolve(form);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/server/user/" + userId + "/form")
                .success(function(forms) {
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }
    }
})();