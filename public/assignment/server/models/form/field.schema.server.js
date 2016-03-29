var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {stype:String, enum:["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options:[{label:String, value: String}]
    });
    return FieldSchema;
};
