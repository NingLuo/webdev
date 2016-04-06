(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("FavoriteCtrl", FavoriteCtrl);

    function FavoriteCtrl ($rootScope, $location, DoctorSearchService, UserService, DoctorService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;
        vm.favoriteDoctors = [];
        vm.unfavorite = unfavorite;
        vm.showDetail = showDetail;

        function init() {
            //fetch favorite doctors
            for(var i in currentUser.favorites) {
                var uid = currentUser.favorites[i];
                DoctorSearchService
                    .findDoctorByUid(uid)
                    .then(function (response) {
                        vm.favoriteDoctors.push(response.data.data);
                    });
            }
        }
        init();

        function unfavorite(doctor) {
            //remove doctor uid from user.favorites in mongoDB
            UserService
                .unfavorite(currentUser._id, doctor.uid)
                .then(
                    function (response) {
                        //remove userId from doctor.favoritedBy in mongoDB
                        return DoctorService.unfavorite(doctor.uid, currentUser._id );
                        //UserService.setCurrentUser(response.data);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
                .then(
                    function (response) {
                        console.log("unfavorite success");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            //remove doctor from local cashed favorite doctor list to make it disappear in the view
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