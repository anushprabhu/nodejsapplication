(function(){
    angular
        .module("FormMakerApp")
        .controller("SideBarController", SideBarController);

    function SideBarController($scope, $location){
        $scope.$location = $location;
    }
})();
