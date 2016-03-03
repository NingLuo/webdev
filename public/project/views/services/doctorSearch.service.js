(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .factory("DoctorSearchService" ,DoctorSearchService);

    function DoctorSearchService ($http) {
        var api = {
            findDoctorByUid: findDoctorByUid
        };
        return api;

        function findDoctorByUid (doctor_uid) {
            var api_key = '40c243f8c6a0fc1e40457c87418afae4';
            var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors/' + doctor_uid + '?user_key=' + api_key;

            return $http.get(resource_url);
        }
    }
})();