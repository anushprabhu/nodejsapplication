(function(){
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope) {
        var model = this;
        model.update = update;

        model.username =  $rootScope.currentUsername;
        model.password = $rootScope.currentPassword;
        model.email = $rootScope.currentEmail;
        model.firstname = $rootScope.currentFirstName;
        model.lastname = $rootScope.currentLastName;

        function update(){
            var userobj = {username: model.username, password: model.password, id: $rootScope.currentId,
                email: model.email, firstName: model.firstname, lastName: model.lastname};

            UserService.updateUser($rootScope.currentId, userobj)
                .then(function(user){
                    if(user != null) {
                        $rootScope.currentUsername = user.username;
                        $rootScope.currentPassword = user.password;
                        $rootScope.currentId = user.id;
                        $rootScope.currentEmail = user.email;
                        $rootScope.currentFirstName = user.firstName;
                        $rootScope.currentLastName = user.lastName;
                    }
                    else {
                        console.log("Update of user entity failed");
                    }
                });
        }
    }
})();