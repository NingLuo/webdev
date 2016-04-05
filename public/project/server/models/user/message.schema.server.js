var mongoose = require('mongoose');

module.exports = function () {
    var MessageSchema = mongoose.Schema({
        senderId   : String,
        senderName : String,
        date       : {type: Date, default: Date.now},
        content    : String
    },{collection: 'project_message'});
    return MessageSchema;
};
