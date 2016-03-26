(function () {
    "use strict";
    
    angular
        .module("FindDoctorApp")
        .factory("DoctorService", DoctorService)

    function DoctorService($http) {
        var api = {
            addFavoriteUserById: addFavoriteUserById,
            addRate: addRate,
            updateRate: updateRate
        };
        return api;

        function addFavoriteUserById(doctorId, userId) {
            return $http.get("/api/doctor/" + doctorId + "/favorited/" + userId);
        }

        function addRate(doctorId, rate) {
            return $http.post("/api/doctor/" + doctorId +"/rated", rate);
        }

        function updateRate(doctorId, rate) {
            return $http.put("/api/doctor/" + doctorId + "/rated", rate);
        }
    }
})();
