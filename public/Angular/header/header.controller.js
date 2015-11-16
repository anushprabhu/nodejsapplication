(function(){
    'use strict';
    angular
        .module("FormMakerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location)
    {
        $scope.$location = $location;
    }
})();