(function(){
    angular
        .module("MovieApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/search", {
                templateUrl: "views/movies/search.view.html",
                controller: "SearchMovieController"
            })
            .when("/details", {
                templateUrl: "views/movies/details.view.html",
                controller: "MovieDetailsController"
            })
            .otherwise({
                redirectTo: "/search"
            });
    }
})();