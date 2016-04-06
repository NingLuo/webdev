var mongoose = require("mongoose");

module.exports = function () {
    var DoctorSchema = require("./doctor.schema.server.js")();
    var Doctor = mongoose.model("Doctor", DoctorSchema);

    var api = {
        addFavoritedBy: addFavoritedBy,
        unfavorite: unfavorite,
        addReview: addReview,
        deleteReview: deleteReview
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
                        console.log(doctor);
                        var newdoctor = {
                            "uid": doctorUid,
                            "favoritedBy": [userId]
                        };
                        return Doctor.create(newdoctor);
                    } else {
                        //need to check if the doctor has already been favorited by this user
                        for(var i in doctor.favoritedBy) {
                            if(doctor.favoritedBy[i] == userId) return "This doctor has already been favorited by you before!";
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

    function unfavorite(doctorUid, userId) {
        return Doctor
            .findOne({"uid": doctorUid})
            .then(
                function (doctor) {
                    for(var i in doctor.favoritedBy) {
                        if(doctor.favoritedBy[i] == userId) {
                            doctor.favoritedBy.splice(i, 1);
                            break;
                        }
                    }
                    return doctor.save();
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
                        return Doctor.create(newdoctor);
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

    function deleteReview(doctorUid, reviewId) {
        return Doctor
            .findOne({"uid": doctorUid})
            .then(
                function (doctor) {
                    for(var i in doctor.reviews) {
                        if(doctor.reviews[i] == reviewId) {
                            doctor.reviews.splice(i, 1);
                            break;
                        }
                    }
                    return doctor.save();
                },
                function (err) {
                    console.log(err);
                }
            )
    }
};

