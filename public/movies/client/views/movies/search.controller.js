(function(){
    angular
        .module("MovieApp")
        .controller("SearchMovieController", SearchMovieController);

    function SearchMovieController($scope){
        $scope.text = "Inside Search Movie Controller"
    }
})();