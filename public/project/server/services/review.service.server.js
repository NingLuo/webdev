module.exports = function (app, ReviewModel) {
    app.post("/api/review", createReview);
    app.delete("/api/review/:reviewId", deleteReview);
    app.get("/api/review/:userId", findReviewByUserId);
    app.get("/api/review/doctor/:doctorId", findReviewByDoctorId);
    app.get("/api/review/:reviewId", findReviewById);

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

    function findReviewByDoctorId(req, res) {
        var doctorId = req.params.doctorId;
        ReviewModel
            .findReviewByDoctorId(doctorId)
            .then(
                function (reviews) {
                    res.json(reviews)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findReviewById(req, res) {
        var reviewId = req.params.reviewId;
        ReviewModel
            .findReviewById(reviewId)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    console.log(err);
                }
            );
    }
};
