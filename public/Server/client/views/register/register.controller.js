(function(){
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("ServerRegisterController", ServerRegisterController);

    function ServerRegisterController(UserService, $location, $rootScope) {
        var model = this;
        model.register = register;

        function register() {
            console.log("Registering new user");
            if(model.password != model.verifyPassword) {
                model.errorMessage = "Password does not match with verify password. Please retype password.";
                return;
            }

            var userObj = {
                username: model.username,
                password: model.password,
                email: model.email,
                firstName: model.username,
                lastName: null
            };

            var user = UserService.createUser(userObj)
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
                });
        }

    }
})();

