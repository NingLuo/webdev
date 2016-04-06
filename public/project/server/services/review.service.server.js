module.exports = function (app, ReviewModel) {
    app.post("/api/review", createReview);
    app.get("/api/review/:userId", findReviewByUserId);
    app.delete("/api/review/:reviewId", deleteReview);

    function createReview(req, res) {
        var review = req.body;
        ReviewModel
            .createReview(review)
            .then(
                function (review) {
                    res.send(review);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function findReviewByUserId(req, res) {
        var userId = req.params.userId;
        ReviewModel
            .findReviewByUserId(userId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        ReviewModel
            .deleteReview(reviewId)
            .then(
                function (response) {
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            );
    }
};
