(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
        }
    }
})();
