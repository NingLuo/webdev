var mongoose = require('mongoose');
var MsgContentSchema = require("./msgContent.schema.server.js")();

module.exports = function () {
    var MessageSchema = mongoose.Schema({
        senderId   : String,
        senderName : String,
        msgContent : [MsgContentSchema]
    },{collection: 'project_message'});
    return MessageSchema;
};


//module.exports = function () {
//    var MessageSchema = mongoose.Schema({
//        senderId   : String,
//        senderName : String,
//        date       : {type: Date, default: Date.now},
//        content    : String
//    },{collection: 'project_message'});
//    return MessageSchema;
//};