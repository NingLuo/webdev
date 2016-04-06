module.exports = function(app, DoctorModel) {
    app.post("/api/doctor/:doctorUid/favorited/:userId", addFavoritedBy);
    app.delete("/api/doctor/:doctorUid/favorited/:userId", unfavorite);
    app.put("/api/doctor/:doctorUid/review/:reviewId", addReview);

    app.post("/api/doctor/:doctorId/rated", addRate);
    app.put("/api/doctor/:doctorId/rated", updateRate);
    app.delete("/api/doctor/:doctorId/rated/:rateId", deleteRate);

    function addFavoritedBy(req, res) {
        var doctorUid = req.params.doctorUid;
        var userId = req.params.userId;
        DoctorModel
            .addFavoritedBy(doctorUid, userId)
            .then(
                function (response) {
                    console.log(response);
                    console.log("above from doctor update success from server");
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            );
    }

    function unfavorite(req, res) {
        var doctorUid = req.params.doctorUid;
        var userId = req.params.userId;
        DoctorModel
            .unfavorite(doctorUid, userId)
            .then(
                function (doctor) {
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function addReview(req, res) {
        var doctorUid = req.params.doctorUid;
        var reviewId = req.params.reviewId;
        DoctorModel
            .addReview(doctorUid, reviewId)
            .then(
                function (doctor) {
                    console.log(doctor);
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            )
    }









    function addRate(req, res) {
        var doctorId = req.params.doctorId;
        var rate = req.body;
        var doctor = DoctorModel.addRate(doctorId, rate);
        res.send(200);
    }

    function updateRate(req, res) {
        var doctorId = req.params.doctorId;
        var rate = req.body;
        DoctorModel.updateRate(doctorId, rate);
        res.send(200);
    }

    function deleteRate(req, res) {
        var doctorId = req.params.doctorId;
        var rateId = req.params.rateId;
        DoctorModel.deleteRate(doctorId, rateId);
        res.send(200);
    }
};
