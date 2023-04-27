const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    user:  {type:String},
    post: {type:String},
    clicked: {type:Boolean}
});

module.exports = mongoose.model("Posts", postSchema);