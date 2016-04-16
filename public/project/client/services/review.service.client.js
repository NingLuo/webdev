(function () {
    angular
        .module("FindDoctorApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview: createReview,
            deleteReview: deleteReview,
            findReviewByUserId: findReviewByUserId,
            findReviewByDoctorId: findReviewByDoctorId,
            findReviewById: findReviewById,
            updateReview: updateReview
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review", review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/" + reviewId);
        }

        function findReviewByUserId(userId) {
            return $http.get("/api/review/user/" + userId);
        }

        function findReviewByDoctorId(doctorId) {
            return $http.get("/api/review/doctor/" + doctorId);
        }

        function findReviewById(reviewId) {
            return $http.get("/api/review/" + reviewId);
        }

        function updateReview(newReivew) {
            return $http.put("/api/reivew/", newReivew);
        }
    }
})();
