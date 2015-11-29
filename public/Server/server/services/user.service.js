var model = require("../models/user.model.js")();

module.exports = function(app) {
    app.get("/api/server/user/username=:username&password=:password", findUserByUsernameAndPassword);
    app.get("/api/server/user", findAllUsers);
    app.get("/api/server/user/:id", findUserById);
    app.post("/api/server/user", addNewUser);
    app.put("/api/server/user/:id", updateUser);
    app.delete("/api/server/user/:id", deleteUser);
    //app.get("/api/server/user/username=:username", findUserByUsername);

    function findUserByUsernameAndPassword(req, res) {
        console.log("Get request findUserByUsernameAndPassword ");
        var credential = { username: req.params.username, password: req.params.password };
        model
            .findUserByCredentials(credential)
            .then(function(user){
                res.json(user);
            });
    }

    function findAllUsers(req, res) {
        console.log("Get request findAllUsers ");
        model
            .findAllUser()
            .then(function(users){
                res.json(users);
            });
    }

    function findUserById(req, res) {
        console.log("Get request findUserById ");
        var userId = req.params.id;
        model
            .findUserById(userId)
            .then(function(user){
               res.json(user);
            });
    }

    function addNewUser(req, res) {
        console.log("Post request addNewUser ");
        var user = req.body;
        model
            .createUser(user)
            .then(function(users){
                res.json(users);
            });
    }

    function updateUser(req, res) {
        console.log("Put request updateUser ");
        var userId = req.params.id;
        var userObj = req.body;
        model
            .updateUser(userId, userObj)
            .then(function(user){
                res.json(user);
            });
    }

    function deleteUser(req, res) {
        console.log("Delete request deleteUser ");
        var userId = req.params.id;
        model
            .deleteUser(userId)
            .then(function(users){
                res.json(users);
            });
    }
};