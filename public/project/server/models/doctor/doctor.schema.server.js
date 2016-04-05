var mongoose = require("mongoose");

module.exports = function () {
    var DoctorSchema = mongoose.Schema({
        uid        : String,
        favoritedBy: [String],
        reviews    : [String]
    }, {collection: 'project_doctor'});
    return DoctorSchema;
};
