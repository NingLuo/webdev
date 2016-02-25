(function(){
    angular
        .module("MovieApp")
        .controller("DetailController", DetailController);

    function DetailController($routeParams, $scope, MovieService) {

        var routeParams = $routeParams.imdbID;

        MovieService.findMovieByImdbId(routeParams, movieRender);

        function movieRender(responde){
            $scope.movie = responde;
        }
    }

})();