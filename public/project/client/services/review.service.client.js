(function () {
    angular
        .module("FindDoctorApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview: createReview,
            deleteReview: deleteReview,
            findReviewByUserId: findReviewByUserId,
            findReviewById: findReviewById
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review", review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/" + reviewId);
        }

        function findReviewByUserId(userId) {
            return $http.get("/api/review/" + userId);
        }

        function findReviewById(reviewId) {
            return $http.get("/api/review/" + reviewId);
        }
    }
})();
