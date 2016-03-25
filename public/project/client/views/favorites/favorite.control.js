(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("FavoriteCtrl", FavoriteCtrl);

    function FavoriteCtrl ($rootScope, $location, DoctorSearchService, UserService) {
        var vm = this;
        vm.favoriteDoctors = [];
        vm.unfavorite = unfavorite;
        vm.showDetail = showDetail;
        var currentUser;
        //var length = currentUser.favorites.length;

        function init() {
             UserService
                 .getLoggedInUser()
                 .then(function (response) {
                     currentUser = response.data;
                     //test if user has logged in
                     if(currentUser) {
                         $rootScope.currentUser = currentUser;
                     } else {
                         $location.url("login");
                     }
                     //fetch favorite doctors
                     for(var i in currentUser.favorites) {
                         var uid = currentUser.favorites[i];
                         DoctorSearchService
                             .findDoctorByUid(uid)
                             .then(function (response) {
                                 console.log(response.data.data);
                                 vm.favoriteDoctors.push(response.data.data);
                             });
                     }
                 });




            //for(var i = 0; i < length; i++) {
            //    var uid = currentUser.favorites[i];
            //    DoctorSearchService.findDoctorByUid(uid)
            //        .then(function (response) {
            //            console.log(response.data);
            //            vm.favoriteDoctors.push(response.data.data);
            //        });
            //}
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

        function showDetail(index) {
            $rootScope.favoriteDoctors = vm.favoriteDoctors;
            $location.url('/favoriteDetail/' + index);
        }
    }
})();