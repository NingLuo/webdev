(function () {
    angular
        .module("FindDoctorApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview: createReview,
            findReviewByUserId: findReviewByUserId
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review", review);
        }

        function findReviewByUserId(userId) {
            return $http.get("/api/review/" + userId);
        }
    }
})();
