(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("DoctorSearchService" ,DoctorSearchService);

    function DoctorSearchService ($http) {
        var api_key = '783c1e3c7f50fcb6035a79e98f56a6af';
        var api = {
            findDoctorByUid: findDoctorByUid,
            findDoctorBySpecialtyAndLocation: findDoctorBySpeciltyAndLocation,
            findDocByConstraints: findDocByConstraints
        };
        return api;

        function findDoctorByUid (doctor_uid) {
            var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors/' + doctor_uid + '?user_key=' + api_key;
            return $http.get(resource_url);
        }

        function findDoctorBySpeciltyAndLocation (specialty, location) {
            var resource_url =  "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=" + specialty + "&location="+location+"&limit=10&user_key=" + api_key;
            return $http.get(resource_url);
        }

        function findDocByConstraints(constraints) {
            var resource_url = "https://api.betterdoctor.com/2016-03-01/doctors?" + constraints;
            console.log(resource_url);
        }
    }
})();
