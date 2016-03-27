module.exports = function(app, DoctorModel) {
    app.get("/api/doctor/:doctorId/favorited/:userId", addFavoriteUserById);
    app.post("/api/doctor/:doctorId/rated", addRate);
    app.put("/api/doctor/:doctorId/rated", updateRate);
    app.delete("/api/doctor/:doctorId/rated/:rateId", deleteRate);

    function addFavoriteUserById(req, res) {
        var doctorId = req.params.doctorId;
        var userId = req.params.userId;
        var doctor = DoctorModel.addFavoriteUserById(doctorId, userId);
        res.send(200);
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