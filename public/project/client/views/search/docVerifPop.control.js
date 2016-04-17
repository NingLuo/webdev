(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .controller("DocVerifPopCtrl", DocVerifPopCtrl);

    function DocVerifPopCtrl($uibModalInstance, doctorUid, doctorName, UserService, $rootScope, $location) {
        var vm = this;
        vm.verifyUid = verifyUid;
        vm.doctorName = doctorName;
        vm.login = login;
        vm.uidVerifFailed = false;
        vm.uidVerifSuccess = false;

        function verifyUid(uid) {
            if(doctorUid == uid) {
                //create a user object and assign it "Provider" role
                var newUser = {};
                newUser.username = doctorName;
                newUser.password = "password";
                newUser.role = "Provider";
                newUser.doctorId = uid;
                //register this user
                UserService
                    .register(newUser)
                    .then(
                        function (response) {
                            $rootScope.currentUser = response.data;
                            vm.uidVerifFailed = false;
                            vm.uidVerifSuccess = true;
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
            }
            else {
                vm.uidVerifFailed = true;
            }
        }

        function login() {
            $location.url("/profile");
            //close popup window
            $uibModalInstance.dismiss();
        }

        vm.close = function () {
            $uibModalInstance.dismiss();
        };
    }
})();
