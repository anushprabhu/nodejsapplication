var users = require("./user.mock.json");

module.exports = function(app, db){
    var api = {
        create: createUser,
        findAll: readUser,
        findById: readUserById,
        update: updateUser,
        remove: removeUser
    };
    return api;

    function createUser(user){
        users.push(user);
        return users;
    }

    function readUser(){
        return users;
    }

    function readUserById(id){

    }

    function updateUser(user){
    }

    function removeUser(id){
        users.splice(id, 1);
        return users;
    }
};