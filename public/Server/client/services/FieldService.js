(function() {
    'user strict';
    angular
        .module("FormBuilderServerApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {
        var api = {
            findAllFieldsByFormId: findAllFieldsByFormId,
            findFieldById: findFieldById,
            createField: createField,
            updateField: updateField,
            deleteField: deleteField
        };

        return api;

        function findAllFieldsByFormId(formId) {
            var deferred = $q.defer();
            $http.get("/api/server/form/"+ formId+ "/field")
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;
        }

        function findFieldById(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/server/form/" + formId + "/field/" + fieldId)
                .success(function(field){
                    deferred.resolve(field);
                });

            return deferred.promise;
        }

        function createField(formId, fieldObj) {
            var deferred = $q.defer();
            $http.post("/api/server/form/" + formId + "/field", fieldObj)
                .success(function(newField) {
                    deferred.resolve(newField);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, fieldObj) {
            var deferred = $q.defer();

            $http.put("/api/server/form/" + formId + "/field/" + fieldId, fieldObj)
                .success(function(field){
                    deferred.resolve(field);
                });

            return deferred.promise;
        }

        function deleteField(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/server/form/" + formId + "/field/" + fieldId)
                .success(function(fields){
                    deferred.resolve(fields);
                });

            return deferred.promise;
        }

    }
})();
