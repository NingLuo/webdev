/**
 * Created by ningluo on 2/18/16.
 */
(function(){
    angular.module("MoviesApp",[])
        .controller("MoviesController", MoviesController);

    function MoviesController($scope){
        console.log("Hello from MoveisController");
        movies = [
            {name: 'Harry Potter', director: 'Rolin', Date: '2000'},
            {name: 'Star War', director: 'JJ', Date: '1989'},
        ];
        $scope.movies = movies;
    };
})();