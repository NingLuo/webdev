var mongoose = require("mongoose");

module.exports = function () {
    var ReviewSchema = mongoose.Schema({
        doctorId     : String,
        userId       : String,
        username     : String,
        doctorName   : String,
        reviewDate   : {type: String, default: Date.now()},
        overall      : String,
        waitTime     : String,
        bedsideManner: String,
        comments     : String
    }, {collection: 'project_review'});
    return ReviewSchema;
};
