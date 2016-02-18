/**
 * Created by ningluo on 2/18/16.
 */
(function(){
    angular.module("MoviesApp",[])
        .controller("MoviesController", MoviesController);

    function MoviesController($scope){
        console.log("Hello from MoveisController");
        movies = [
            {name: 'Harry Potter', director: 'Rolin', year: '2000'},
            {name: 'Star War', director: 'JJ', year: '1989'},
        ];
        $scope.movies = movies;


        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        function addMovie(movie) {
            console.log(movie);
            var newMovie = {
                name: movie.name,
                director: movie.director,
                year: movie.year
            };
            $scope.movie = {};
            $scope.movies.push(newMovie);
        }

        function removeMovie(movie) {
            console.log("Remove movie: " + movie.name);
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        function selectMovie(movie) {
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);
            $scope.movie = {
                name: movie.name,
                director: movie.director,
                year: movie.year
            };
        }

        function updateMovie(movie) {
            $scope.movies[$scope.selectedMovieIndex] = {
                name: movie.name,
                director: movie.director,
                year: movie.year
            };
        }
    };
})();