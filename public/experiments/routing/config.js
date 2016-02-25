(function(){
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl:"home.view.html"
            })
            .when("/search", {
                templateUrl:"search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/detail/:imdbID", {
                templateUrl: "detail/detail.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo:"/home"
            });


    }

})();