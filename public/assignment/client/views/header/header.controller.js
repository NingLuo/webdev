(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, UserService){
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            //$rootScope.currentUser = null;
        }
    }
})();
