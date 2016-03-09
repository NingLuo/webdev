(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("FavoriteCtrl", FavoriteCtrl);

    function FavoriteCtrl ($rootScope, DoctorSearchService) {
        var vm = this;
        vm.favoriteDoctors = [];
        vm.unfavorite = unfavorite;
        var currentUser = $rootScope.currentUser;
        var length = currentUser.favorites.length;

        function init() {
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
        init();

        function unfavorite(doctor) {
            //删除掉用户的favorites里的doctor id
            for(var i=0; i<length; i++) {
                if(currentUser.favorites[i] == doctor.uid) {
                    currentUser.favorites.splice(i, 1);
                }
            }
            //删除掉从http成功取回的docotr list里的doctor对象, 为了使其从view里消失
            for(var i=0; i<vm.favoriteDoctors.length; i++) {
                if(vm.favoriteDoctors[i].uid == doctor.uid) {
                    vm.favoriteDoctors.splice(i, 1);
                }
            }
        }
    }
})();