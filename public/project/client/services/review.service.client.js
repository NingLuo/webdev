(function () {
    angular
        .module("FindDoctorApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview: createReview
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review", review);
        }
    }
})();
