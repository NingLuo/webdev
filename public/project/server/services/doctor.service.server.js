module.exports = function(app, DoctorModel) {
    app.get("/api/doctor/:doctorId/favorited/:userId", addFavoriteUserById);

    function addFavoriteUserById(req, res) {
        console.log("addFavoriteUserById server");
        var doctorId = req.params.doctorId;
        var userId = req.params.userId;
        var doctor = DoctorModel.addFavoriteUserById(doctorId, userId);
        console.log(doctor);
        res.send(200);
    }
};
