var mongoose = require("mongoose");

module.exports = function () {
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Project_Review", ReviewSchema);

    var api = {
        createReview: createReview,
        deleteReview: deleteReview,
        findReviewByUserId: findReviewByUserId,
        findReviewById: findReviewById
    };
    return api;

    function createReview(review) {
        return Review.create(review);
    }

    function deleteReview(reviewId) {
        return Review.remove({"_id": reviewId});
    }

    function findReviewByUserId(userId) {
        return Review.find({"userId": userId});
    }

    function findReviewById(reviewId) {
        return Review.findById(reviewId);
    }
};