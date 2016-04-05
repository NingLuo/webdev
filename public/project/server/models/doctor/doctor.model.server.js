var mongoose = require("mongoose");

module.exports = function () {
    var DoctorSchema = require("./doctor.schema.server.js")();
    var Doctor = mongoose.model("Doctor", DoctorSchema);

    var api = {
        addFavoritedBy: addFavoritedBy,
        addReview: addReview
    };
    return api;

    //function createDoctor(uid) {
    //    var doctor = {};
    //    doctor.uid = uid;
    //    return Doctor.create(doctor);
    //}

    function addFavoritedBy(doctorUid, userId) {
        return Doctor
            .findOne({"uid": doctorUid})
            .then(
                function (doctor) {
                    if(!doctor) {
                        //if doctor doesn't exist, create a doctor document instead and added the userId who favorites this doctor
                        var newdoctor = {
                            "uid": doctorUid,
                            "favoritedBy": [userId]
                        };
                        return Doctor.update(newdoctor);
                    } else {
                        //need to check if the doctor has already been favorited by this user
                        for(var i in doctor.favoritedBy) {
                            if(doctor.favoritedBy[i] == userId) return "This doctor has already been favorited by you before!"
                        }
                        doctor.favoritedBy.push(userId);
                        return doctor.save();
                    }
                },
                function (err) {
                    console.log(err);
                }
            )
    }

    function addReview(doctorUid, reviewId) {
        return Doctor
            .findOne({"uid": doctorUid})
            .then(
                function (doctor) {
                    if(!doctor) {
                        var newdoctor = {
                            "uid": doctorUid,
                            "reviews": [reviewId]
                        };
                        return Doctor.update(newdoctor);
                    } else {
                        doctor.reviews.push(reviewId);
                        return doctor.save();
                    }
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};

