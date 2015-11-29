(function() {
    'user strict';
    angular
        .module("FormBuilderServerApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            updateUser: updateUser,
            createUser: createUser
        };

        return api;

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/server/user/username=" + username + "&password=" + password)
                .success(function(user) {
                    console.log("Retrieved findUserByUsernameAndPassword " + user);
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function updateUser(userId, userObj) {
            var deferred = $q.defer();
            $http.put("/api/server/user/" + userId, userObj)
                .success(function(user) {
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function createUser(userObj) {
            var deferred = $q.defer();
            $http.post("/api/server/user", userObj)
                .success(function(user) {
                    deferred.resolve(user);
                });

            return deferred.promise;
        }
    }
})();