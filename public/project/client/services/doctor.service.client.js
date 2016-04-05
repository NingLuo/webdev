(function () {
    "use strict";
    
    angular
        .module("FindDoctorApp")
        .factory("DoctorService", DoctorService)

    function DoctorService($http) {
        var api = {
            addFavoritedBy: addFavoritedBy,
            addReview: addReview,
            addRate: addRate,
            updateRate: updateRate,
            deleteRate: deleteRate
        };
        return api;

        function addFavoritedBy(doctorUid, userId) {
            return $http.get("/api/doctor/" + doctorUid + "/favorited/" + userId);
        }

        function addReview(doctorUid, reviewId) {
            return $http.put("/api/doctor/" + doctorUid + "/review/" + reviewId);
        }




        function addRate(doctorId, rate) {
            return $http.post("/api/doctor/" + doctorId +"/rated", rate);
        }

        function updateRate(doctorId, rate) {
            return $http.put("/api/doctor/" + doctorId + "/rated", rate);
        }

        function deleteRate(doctorId, rateId) {
            return $http.delete("/api/doctor/" + doctorId + "/rated/" + rateId);
        }
    }
})();
