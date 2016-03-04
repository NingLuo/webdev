(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("FavoriteCtrl", FavoriteCtrl);

    function FavoriteCtrl ($rootScope, DoctorSearchService) {
        var vm = this;
        vm.favoriteDoctors = [];
        var currentUser = $rootScope.currentUser;
        var length = currentUser.favorites.length;

        //由于http请求有失败几率,所以这块要想办法用循环来保证成功率
        for(var i = 0; i < length; i++) {
            var uid = currentUser.favorites[i];
            DoctorSearchService.findDoctorByUid(uid)
                .then(function (response) {
                    console.log(response.data);
                    vm.favoriteDoctors.push(response.data.data);
                });
        }
    }
})();