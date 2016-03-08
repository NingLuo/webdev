(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("DoctorSearchService" ,DoctorSearchService);

    function DoctorSearchService ($http) {
        var api_key = '40c243f8c6a0fc1e40457c87418afae4';
        var api = {
            findDoctorByUid: findDoctorByUid,
            findDoctorBySpecialtyAndLocation: findDoctorBySpeciltyAndLocation
        };
        return api;

        function findDoctorByUid (doctor_uid) {
            var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors/' + doctor_uid + '?user_key=' + api_key;
            return $http.get(resource_url);
        }

        function findDoctorBySpeciltyAndLocation (specialty_uid, location) {
            var resource_url =  "https://api.betterdoctor.com/2015-01-27/doctors?specialty_uid=" + specialty_uid + "&location=" + location + "&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=40c243f8c6a0fc1e40457c87418afae4";

            return $http.get(resource_url);
        }
    }
})();
