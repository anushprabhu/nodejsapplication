(function(){
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var model = this;
        model.login = login;

        function login() {
            var username = model.username;
            var password = model.password;
            model.errorMessage = null;
            UserService.findUserByUsernameAndPassword(username, password)
                    .then(function(user){
                        if(user != null) {
                            $rootScope.currentUsername = user.username;
                            $rootScope.currentPassword = user.password;
                            $rootScope.currentId = user.id;
                            $rootScope.currentEmail = user.email;
                            $rootScope.currentFirstName = user.firstName;
                            $rootScope.currentLastName = user.lastName;
                            $rootScope.refreshLogin();
                            $location.url("/profile");
                        }
                        else {
                            model.errorMessage = "Invalid username or password. Please try again!";
                        }
                });
        }
    }
})();