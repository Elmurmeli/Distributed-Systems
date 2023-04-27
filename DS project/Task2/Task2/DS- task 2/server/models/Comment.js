const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    user: {type: String},
    postid: {type: String},
    comment: {type:String},
});

module.exports = mongoose.model("Comments", commentSchema);