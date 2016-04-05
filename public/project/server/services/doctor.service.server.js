module.exports = function(app, DoctorModel) {
    app.get("/api/doctor/:doctorUid/favorited/:userId", addFavoritedBy);
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
                    res.send(200);
                },
                function (err) {
                    console.log(err);
                }
            );
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
