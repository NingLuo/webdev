(function () {
   "use strict";

    angular
        .module("FindDoctorApp")
        .controller("NavbarCtrl", NavbarCtrl);

    function NavbarCtrl($location) {
        var vm = this;
        vm.$location = $location;
    }
})();