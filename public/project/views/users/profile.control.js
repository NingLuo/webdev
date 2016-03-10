(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("ProfileCtrl", ProfileCtrl);

    function ProfileCtrl($rootScope, $location) {
        if($rootScope.currentUser){
            console.log('Hello, ' + $rootScope.currentUser.username);
        } else {
            $location.url('/login');
        }
    }
})();