var mongoose = require("mongoose");

var TodoSchema = mongoose.Schema({
    name: String,
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Todo", TodoSchema);