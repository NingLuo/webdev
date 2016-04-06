module.exports = function (app, ReviewModel) {
    app.post("/api/review", createReview);
    app.get("/api/review/:userId", findReviewByUserId);

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
};
