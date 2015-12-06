var users = require("./user.mock.json");
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(app){
    var api = {
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    /* Basic CRUD operations */

    function createUser(newUser) {
        console.log("Creating new user " + newUser);
        var deferred = q.defer();
        newUser.id = uuid.v1();
        users.push(newUser);
        deferred.resolve(newUser);
        return deferred.promise;
    }

    function findAllUser() {
        console.log("Fetching all users");
        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
    }

    function findUserById(userId) {
        console.log("Fetching user with "+userId);
        var deferred = q.defer();
        var findUser = getUserById(userId);
        deferred.resolve(findUser);
        return deferred.promise;
    }

    function updateUser(userId, updateUser) {
        console.log("Updating user ["+userId+"]");
        var deferred = q.defer();
        var findUser = getUserById(userId);
        if(findUser != null) {
            findUser.username = updateUser.username;
            findUser.password = updateUser.password;
            findUser.firstName = updateUser.firstName;
            findUser.lastName = updateUser.lastName;
            findUser.email = updateUser.email;
        }
        else {
            console.log("No matching user found with id " + userId + ". Skipping update.");
        }
        deferred.resolve(findUser);
        return deferred.promise;
    }

    function deleteUser(userId) {
        console.log("Deleting user ["+userId+"].");
        var deferred = q.defer();
        for(var user in users) {
            if(users[user].id == userId) {
                users.splice(user, 1);
                break;
            }
        }

        deferred.resolve(users);
        return deferred.promise;
    }

    /* User model specific operations */

    function findUserByUsername(username) {
        console.log("Fetching user by username ["+username+"]");
        var deferred = q.defer();

        var findUser = null;
        for(var user in users) {
            if(users[user].username == username) {
                findUser = users[user];
                break;
            }
        }

        deferred.resolve(findUser);
        return deferred.promise;
    }

    function findUserByCredentials(credential) {
        console.log("Fetching user by credential [" + credential.username + "]");
        var deferred = q.defer();

        var findUser = null;
        for(var user in users) {
            if(users[user].username == credential.username &&
                users[user].password == credential.password) {
                findUser = users[user];
                break;
            }
        }

        if(findUser == null) {
            console.log("User not found matching username [" + credential.username + "] password [" + credential.password + "]");
        }

        deferred.resolve(findUser);
        return deferred.promise;
    }

    /* Private helper methods */

    /* Retrieve user by id field of the user entity */
    function getUserById(userId){
        console.log("Fetching user by id ["+userId+"]");
        var findUser = null;
        for(var user in users) {
            if(users[user].id == userId) {
                findUser = users[user];
                break;
            }
        }

        return findUser;
    }
}