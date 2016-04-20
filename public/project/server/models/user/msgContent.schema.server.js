var mongoose = require('mongoose');

module.exports = function () {
    var MsgContentSchema = mongoose.Schema({
        senderName : String,
        date       : {type: Date, default: Date.now},
        content    : String
    },{collection: 'project_msgContent'});
    return MsgContentSchema;
};