var mongoose = require("mongoose");

module.exports = function () {
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Project_Review", ReviewSchema);

    var api = {
        createReview: createReview,
        findReviewByUserId: findReviewByUserId,
        deleteReview: deleteReview
    };
    return api;

    function createReview(review) {
        return Review.create(review);
    }

    function findReviewByUserId(userId) {
        return Review.find({"userId": userId});
    }

    function deleteReview(reviewId) {
        return Review.remove({"_id": reviewId});
    }
};