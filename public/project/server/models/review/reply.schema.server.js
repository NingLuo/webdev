var mongoose = require('mongoose');

module.exports = function () {
    var ReplySchema = mongoose.Schema({
        senderId   : String,
        senderName : String,
        date       : {type: Date, default: Date.now},
        content    : String
    },{collection: 'project_reply'});
    return ReplySchema;
};