var mongoose = require("mongoose");
var MessageSchema = require("./message.schema.server.js")();

module.exports = function() {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email   : String,
        phone   : String,
        gender  : {type: String, enum:['Male', 'Female']},
        role: {type: String, enum:['Patient', 'Provider']},
        doctorId: String,
        favorites: [String],
        reviews: [String],
        messages: [MessageSchema]
    },{collection: 'project_user'});
    return UserSchema;
};
