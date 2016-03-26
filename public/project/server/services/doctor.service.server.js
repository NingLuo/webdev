module.exports = function(app, DoctorModel) {
    app.get("/api/doctor/:doctorId/favorited/:userId", addFavoriteUserById);
    app.post("/api/doctor/:doctorId/rated", addRate);

    function addFavoriteUserById(req, res) {
        var doctorId = req.params.doctorId;
        var userId = req.params.userId;
        var doctor = DoctorModel.addFavoriteUserById(doctorId, userId);
        console.log(doctor);
        res.send(200);
    }

    function addRate(req, res) {
        var doctorId = req.params.doctorId;
        var rate = req.body;
        var doctor = DoctorModel.addRate(doctorId, rate);
        console.log(doctor);
        res.send(200);
    }
};
