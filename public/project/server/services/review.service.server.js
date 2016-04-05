module.exports = function (app, ReviewModel) {
    app.post("/api/review", createReview);

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
};
