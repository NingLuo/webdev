(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByImdbId: findMovieByImdbId
        }

        return api;

        //Function implementation
        function findMovieByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(callback);
        }

        function findMovieByImdbId(imdbId, callback) {
            $http.get("http://www.omdbapi.com/?i=" + imdbId)
                .success(callback);
        }
    }

})();