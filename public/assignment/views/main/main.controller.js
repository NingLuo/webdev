/**
 * Created by ningluo on 2/18/16.
 */
(function(){
    angular.module('FormBuilderApp')     //controller里不能加 ['ngRoute'] !!!!!!!!!
        .controller('MainController', MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
    }
})();