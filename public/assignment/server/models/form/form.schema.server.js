var mongoose = require("mongoose");
var FieldSchema = require("./field.schema.server.js")();

module.exports = function () {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: 'New Form'},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    },{collection: 'form'});
    return FormSchema;
};
