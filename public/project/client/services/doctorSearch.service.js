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
            var resource_url = "https://api.betterdoctor.com/2016-03-01/doctors?";
            if(constraints.specialty !== null){
                resource_url = resource_url + "specialty_uid=" + constraints.specialty;
            }
            if(constraints.geolocation != null) {
                resource_url = resource_url + "&location=" + constraints.geolocation;
            }
            if(constraints.insurance !== "null") {
                resource_url = resource_url + "&insurance_uid=" + constraints.insurance;
            }
            if(constraints.gender !== "null") {
                resource_url = resource_url + "&gender=" + constraints.gender;
            }
            if(constraints.doctorName !== "null" && constraints.doctorName) {
                resource_url = resource_url + "&name=" + constraints.doctorName;
            }
            resource_url = resource_url + '&user_key=' + api_key;
            return $http.get(resource_url);
        }
    }
})();
