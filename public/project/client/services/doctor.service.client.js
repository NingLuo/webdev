(function () {
    "use strict";
    
    angular
        .module("FindDoctorApp")
        .factory("DoctorService", DoctorService)

    function DoctorService($http) {
        var api = {
            addFavoriteUserById: addFavoriteUserById
        };
        return api;

        function addFavoriteUserById(doctorId, userId) {
            return $http.get("/api/doctor/" + doctorId + "/favorited/" + userId);
        }
    }
})();
