(function () {
    "use strict";

    angular
        .module('FindDoctorApp')
        .controller('FavoriteDetailCtrl', FavoriteDetailCtrl);

    function FavoriteDetailCtrl($routeParams, $rootScope) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        var length = currentUser.favorites.length;
        var index = $routeParams.index;
        vm.data = $rootScope.favoriteDoctors[index];
        vm.unfavorite = unfavorite;

        function unfavorite() {
            for(var i=0; i<length; i++) {
                if(currentUser.favorites[i] == vm.data.uid) {
                    currentUser.favorites.splice(i, 1);
                    console.log('delete success');
                }
            }
        }
    }
})();