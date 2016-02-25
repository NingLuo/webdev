(function(){
    angular.module("MovieApp")
        .controller("NavController", NavController);

    function NavController($scope, $location) {
        $scope.$location = $location;
    }
})();