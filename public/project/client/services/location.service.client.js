(function () {
   "use strict";

    angular
        .module("FindDoctorApp")
        .factory("LocationService", LocationService);

    function LocationService($http) {
        var api = {
            getGeolocation: getGeolocation
        };
        return api;

        function getGeolocation(zipCode) {
            return $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode);
        }
    }
})();
