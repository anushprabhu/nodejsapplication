(function(){
    'use strict';
    angular
        .module("FormMakerApp")
        .controller("MainController",MainController);

    function MainController($scope, $location){
        $scope.source = "MainController";
    }
})();