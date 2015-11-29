(function(){
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("ServerHeaderController", ServerHeaderController);

    function ServerHeaderController($scope, $rootScope, $location)
    {
        var model = this;
        $scope.$location = $location;
        $rootScope.refreshLogin = refreshLogin;
        model.logout = logout;
        model.loggedIn = false;

        function refreshLogin() {
            console.log("Refresh login called");
            if ($rootScope.currentId != 0) {
                model.loggedIn = true;
                model.displayName = $rootScope.currentFirstName + " " + $rootScope.currentLastName;
                console.log(model.displayName);
            }
        }

        function logout() {
            console.log("logging out current user");
            model.loggedIn = false;
            model.displayName = null;
            $rootScope.currentUsername = null;
            $rootScope.currentPassword = null;
            $rootScope.currentId = null;
            $rootScope.currentEmail = null;
            $rootScope.currentFirstName = null;
            $rootScope.currentLastName = null;
            $location.url("/login");
        }
    }
})();