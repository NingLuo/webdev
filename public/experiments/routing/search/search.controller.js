(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $routeParams, MovieService){

        // event handler declarations
        $scope.search = search;
        var routeTitle = $routeParams.title;

        if(routeTitle) {
            search(routeTitle);
        }


        // event handler implementation
        function search(title) {

            $location.url("/search/" + title); //这句并不会触发config来load /search/: title, 因为只是改了url而没有在地址栏里回车确定

            MovieService.findMovieByTitle(title, render);

            function render(responde){
                console.log(responde);
                $scope.data = responde;
            }
        }
    }



})();