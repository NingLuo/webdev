var mongoose = require("mongoose");

module.exports = function () {
    var DoctorSchema = require("./doctor.schema.server.js")();
    var Doctor = mongoose.model("Doctor", DoctorSchema);

    var api = {
        addFavoritedBy: addFavoritedBy
    };
    return api;

    function createDoctor(uid, userId) {
        var doctor = {};
        doctor.uid = uid;
        doctor.favoritedBy = [userId];
        return Doctor.create(doctor);
    }

    function addFavoritedBy(doctorUid, userId) {
        return Doctor
            .findOne({"uid": doctorUid})
            .then(
                function (doctor) {
                    if(!doctor) {
                        return createDoctor(doctorUid, userId);
                    } else {
                        doctor.favoritedBy.push(userId);
                        return doctor.save();
                    }
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};

