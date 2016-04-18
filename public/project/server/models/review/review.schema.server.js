var mongoose = require("mongoose");
var ReplySchema = require("./reply.schema.server.js")();

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
        comments     : String,
        reply        : ReplySchema
    }, {collection: 'project_review'});
    return ReviewSchema;
};
