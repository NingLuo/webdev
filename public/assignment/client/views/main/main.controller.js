(function () {
    "use strict";

    angular
        .module('FormBuilderApp')                            //controller里不能加 ['ngRoute'] !!!!!!!!!
        .controller('MainController', MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();