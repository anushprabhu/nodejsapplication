(function(){
    angular
        .module("FormBuilderServerApp")
        .controller("SideBarController", SideBarController);

    function SideBarController($scope, $location){
        $scope.$location = $location;
    }
})();
