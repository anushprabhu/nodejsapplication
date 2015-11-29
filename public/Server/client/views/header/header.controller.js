(function(){
    'use strict';
    angular
        .module("FormBuilderServerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location)
    {
        $scope.$location = $location;
    }
})();