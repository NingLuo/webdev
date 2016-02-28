(function(){
    angular.module("WhiteBoardApp",[])
        .controller("CourseController", CourseController);

    function CourseController($scope, $http) {

        $http.get('/rest/course')
            .success(function(response){
                $scope.courses = response;
            });
    }
})();